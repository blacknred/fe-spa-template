import { Avatar, Link, OffsetPagination, Spinner, Table } from '@/components/Elements';
import { Form, InputField, SelectField } from '@/components/Form';
import { defaultSearchParams } from '@/utils';
import { format, parseISO } from 'date-fns';
import debounce from 'lodash.debounce';
import { FormEvent, useCallback } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { roleOptions } from '..';
import { GetUsersDto, getUsersDto, useUsers } from '../api';
import { Role, User } from "../types";
import { Order } from '@/types';

export const UserList = injectIntl(({ intl }: WrappedComponentProps) => {
  const [params, setParams] = useSearchParams(defaultSearchParams);
  const { data, isLoading } = useUsers(params.toString());

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
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data) return null;

  return (
    <>
      <Form<GetUsersDto, typeof getUsersDto>
        schema={getUsersDto}
        id="get-users"
        className='space-y-0 flex flex-col sm:flex-row sm:items-end justify-between mt-5 mb-5'
        options={{
          defaultValues: {
            role: params.get('role') as Role ?? undefined,
            text: params.get('text') ?? undefined,
          },
        }}
      >
        {({ register }) => (
            <>
              <SelectField
                placeholder={intl.formatMessage({ id: 'field.role' })}
                registration={register('role', { onChange })}
                className="w-full sm:w-[200px]"
                options={roleOptions}
              />
              <InputField
                placeholder={intl.formatMessage({ id: 'ui.search' }) + "..."}
                className="w-full sm:w-[300px]"
                registration={register('text', {
                  onChange: debounce(onChange, 1000),
                })}
              />
            </>
          )}
      </Form>

      <Table<User>
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
            cell: ({ entry: { image, name } }) => <Avatar src={image} alt={name} variant='round' />,
          },

          {
            title: intl.formatMessage({ id: 'field.name' }),
            field: "name",
            onSort
          },
          {
            title: intl.formatMessage({ id: 'field.city' }),
            field: 'city',
            onSort
          },
          {
            title: intl.formatMessage({ id: 'field.role' }),
            cell: ({ entry: { role } }) => <span>{role.toUpperCase()}</span>,
            field: "role",
            onSort
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
            title: intl.formatMessage({ id: 'field.online' }),
            field: "id",
            cell: ({ entry: { online } }) => <span>{online ? 'online' : 'offline'}</span>
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

