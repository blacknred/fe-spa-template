import { Avatar, Link, OffsetPagination, Spinner, Table } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { CategorySelectField } from '@/features/categories';
import { defaultSearchParams } from '@/utils';
import { format, parseISO } from 'date-fns';
import debounce from 'lodash.debounce';
import { FormEvent, useCallback } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { GetProductsDto, getProductsDto, useProducts } from '../api/getProducts';
import type { Product } from "../types";
import { CreateProduct } from './CreateProduct';
import { DeleteProduct } from './DeleteProduct';
import { Order } from '@/types';

export const ProductList = injectIntl(({ intl }: WrappedComponentProps) => {
  const [params, setParams] = useSearchParams(defaultSearchParams);
  const { data, isLoading, refetch } = useProducts(params.toString());

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

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size='lg' />
      </div>
    )
  }

  if (!data) return null;

  return (
    <>
      <Form<GetProductsDto, typeof getProductsDto>
        schema={getProductsDto}
        className='space-y-0 flex flex-col sm:flex-row sm:items-end justify-around mt-5 mb-5'
        id="get-products"
        options={{
          defaultValues: {
            categoryId: +params.get('categoryId')! ?? undefined,
            text: params.get('text') ?? undefined,
          },
        }}
      >
        {({ register }) => (
          <>
            <CategorySelectField
              placeholder={intl.formatMessage({ id: 'field.category' })}
              registration={register('categoryId', { onChange })}
              className="w-full sm:w-[200px]"
            />
            <div className='flex-1' />
            <InputField
              placeholder={intl.formatMessage({ id: 'ui.search' }) + "..."}
              className="w-full sm:w-[300px] mr-4"
              registration={register('text', {
                onChange: debounce(onChange, 1000),
              })}
            />
            <CreateProduct onSuccess={refetch} />
          </>
        )}
      </Form>

      <Table<Product>
        data={data.items}
        columns={[
          {
            title: "Id",
            field: 'id',
            cell: ({ entry: { id } }) => <Link to={`./${id}`}>#{id}</Link>,
          },
          {
            title: intl.formatMessage({ id: 'field.image' }),
            field: "preview",
            cell: ({ entry: { preview, name } }) => <Avatar src={preview} alt={name} variant='square' />,
          },
          {
            title: intl.formatMessage({ id: 'field.name' }),
            field: "name",
            onSort
          },
          {
            title: intl.formatMessage({ id: 'field.category' }),
            field: 'category',
            cell: ({ entry: { category } }) => <span>{category.name}</span>,
            onSort,
          },
          {
            title: intl.formatMessage({ id: 'field.price' }),
            field: "price",
            cell: ({ entry: { price } }) => <span>{intl.formatNumber(price)}</span>,
            onSort
          },
          {
            title: intl.formatMessage({ id: 'field.barcode' }),
            field: "barcode",
          },
          {
            title: intl.formatMessage({ id: 'field.quantity' }),
            field: "quantity",
            onSort
          },
          {
            title: intl.formatMessage({ id: 'field.author' }),
            field: "author",
            cell: ({ entry: { author } }) => <span>{author.name}</span>
          },
          {
            title: intl.formatMessage({ id: 'field.createdAt' }),
            field: 'createdAt',
            onSort,
            cell({ entry: { createdAt } }) {
              if (!createdAt) return <span>-</span>;
              return <span>{format(parseISO(createdAt), 'yyyy-LL-dd')}</span>;
            },
          },
          {
            title: "",
            field: "id",
            cell: ({ entry }) => <DeleteProduct product={entry} onSuccess={refetch} />
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
  );
});

