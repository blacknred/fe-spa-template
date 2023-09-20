import { IS_TEST } from '@/config';
import { Role, User } from '@/features/users';
import {
  BaseEntity,
  Order,
  PaginatedRequestDto,
  PaginatedResponseDto,
} from '@/types';
import {
  DefaultBodyType,
  RestContext,
  RestRequest,
  context,
  createResponseComposition,
} from 'msw';
import { FieldError } from 'react-hook-form';
import { ZodError, ZodType, ZodTypeDef } from 'zod';
import { default as users } from '../data/user.json';

export const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';

export const res = createResponseComposition(undefined, [
  context.delay(IS_TEST ? 0 : 1000),
]);

export function formatError(path: string, message: string) {
  return { [path]: { message, type: 'validate' } };
}

export class HttpError {
  constructor(
    public status = 500,
    public body?: Record<string, unknown> | string,
  ) {}
  res(ctx: RestContext) {
    const status = ctx.status(this.status);
    if (!this.body) return res(status);
    if (typeof this.body === 'string') {
      return res(status, ctx.text(this.body));
    }
    return res(status, ctx.json(this.body));
  }
}

export function exclude<T extends BaseEntity = BaseEntity>(
  entity: T,
  excluded: (keyof T)[],
) {
  const included = Object.keys(entity).filter(
    (field) => !excluded.includes(field as keyof T),
  );
  return JSON.parse(JSON.stringify(entity, included)) as Omit<
    T,
    (typeof excluded)[number]
  >;
}

export function checkAuth(request: RestRequest, roles?: Role[]) {
  const token = request.cookies['Authentication'];

  if (!token) throw new HttpError(401);

  const id = +token.split('_')[1];
  const user = users.find((user) => user.id === id) as User | null;

  if (!user) throw new HttpError(401);

  if (roles && !roles.includes(user.role)) {
    throw new HttpError(403, 'Not allowed');
  }

  return user;
}

export function validate<
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  schema: ZodType<unknown, ZodTypeDef, unknown>,
  values: DefaultBodyType & object,
  defaultValues?: T,
) {
  try {
    schema.parse(values);
    return values as T;
  } catch (e: unknown) {
    if (!(e instanceof ZodError)) throw new HttpError(400);

    const { fieldErrors } = e.formErrors;

    if (defaultValues) {
      Object.keys(fieldErrors).forEach((error) => {
        values[error] = defaultValues[error];
      });

      return validate(schema, values);
    }

    const errors = Object.keys(fieldErrors).reduce((all, cur) => {
      if (!fieldErrors[cur]) return all;
      const curError = formatError(cur, fieldErrors[cur]![0]);
      return { ...all, ...curError };
    }, {} as Record<string, FieldError>);

    throw new HttpError(400, errors);
  }
}

export function findAndCount<T extends BaseEntity = BaseEntity>(
  collection: T[],
  params: PaginatedRequestDto<T>,
): PaginatedResponseDto<T> {
  const {
    limit,
    offset,
    text,
    'sort.order': order,
    'sort.field': field,
    ...rest
  } = params;
  const filters = Object.keys(rest) as (keyof T)[];

  const dataset = collection
    .filter((item) =>
      filters.every(
        (col) =>
          item[col] === undefined ||
          item[col] == rest[col as keyof typeof rest],
      ),
    )
    .filter(
      (item) =>
        !text ||
        (item['name' as keyof T] as string)
          .toLowerCase()
          .startsWith(text.toLowerCase()),
    )
    .sort((a, b) => {
      const isDesc = order === Order.desc;
      const first = a[field as keyof T];
      const second = b[field as keyof T];

      if (first > second) return isDesc ? -1 : 1;
      else if (first < second) return isDesc ? 1 : -1;
      return 0;
    });

  return {
    hasMore: dataset.length > +offset + +limit,
    items: dataset.slice(+offset, +offset + +limit),
    total: dataset.length,
  };
}
