import { Avatar, Link, OffsetPagination, Spinner, Table } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { Order } from '@/types';
import { defaultSearchParams, formatDate } from '@/utils';
import debounce from 'lodash.debounce';
import { FormEvent, useCallback } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { GetCategoriesDto, getCategoriesDto, useCategories } from '../api';
import type { Category } from "../types";
import { CreateCategory } from './CreateCategory';
import { DeleteCategory } from './DeleteCategory';

export const CategoryList = injectIntl(({ intl }: WrappedComponentProps) => {
  const [params, setParams] = useSearchParams(defaultSearchParams);
  const { data, isLoading, refetch } = useCategories(params.toString());

  const onSort = useCallback((field: string) => {
    setParams(params => {
      const order = params.get('sort.order') === Order.asc ? Order.desc : Order.asc;
      params.set('sort.field', field);
      params.set('sort.order', order);
      return params;
    })
  }, [setParams])

  const onChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setParams(params => {
      params.set('offset', '0');
      if (value) params.set(name, value.toString());
      else params.delete(name);
      return params;
    })
  }, [setParams])


  return (
    <>
      <Form<GetCategoriesDto, typeof getCategoriesDto>
        schema={getCategoriesDto}
        className='space-y-0 flex flex-col sm:flex-row sm:items-end  justify-between mt-5 mb-5'
        id="get-categories"
        options={{
          defaultValues: {
            text: params.get('text') ?? undefined,
          },
        }}
      >
        {({ register }) => (
          <>
            <InputField
              placeholder={intl.formatMessage({ id: 'ui.search' }) + "..."}
              className="w-full sm:w-[300px] mr-4"
              registration={register('text', {
                onChange: debounce(onChange, 1000),
              })}
            />
            <CreateCategory onSuccess={refetch} />
          </>
        )}
      </Form>

      {isLoading && (
        <div className="w-full h-48 flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      )}

      {data && (
        <>
          <Table<Category>
            data={data.items}
            columns={[
              {
                title: "Id",
                field: 'id',
                cell: ({ entry: { id } }) => <Link to={`./${id}`}>#{id}</Link>,
              },
              {
                title: intl.formatMessage({ id: 'field.image' }),
                field: "image",
                cell: ({ entry: { image } }) => <Avatar src={image} variant='square' />,
              },

              {
                title: intl.formatMessage({ id: 'field.name' }),
                field: "name",
                onSort
              },
              {
                title: intl.formatMessage({ id: 'field.createdAt' }),
                field: 'createdAt',
                onSort,
                cell({ entry: { createdAt } }) {
                  if (!createdAt) return <span>-</span>;
                  return <span>{formatDate(createdAt)}</span>;
                },
              },
              {
                title: "",
                field: "id",
                cell: ({ entry }) => <DeleteCategory category={entry} onSuccess={refetch} />
              }
            ]}
          />

          <OffsetPagination
            total={data.total}
            limit={data.items.length}
            offset={+params.get('offset')!}
            onChange={(offset) => {
              setParams(params => {
                params.set('offset', offset.toString());
                return params;
              })
            }}
          />
        </>
      )}
    </>
  )
});


