import { API_URL } from '@/config';
import {
  CreateUserDto,
  GetUsersDto,
  Role,
  UpdateUserDto,
  createUserDto,
  getUsersDto,
  updateUserDto,
} from '@/features/users';
import { defaultSearchParams } from '@/utils';
import { rest } from 'msw';
import { db } from '../db';
import {
  HttpError,
  buildPaginatedQuery,
  checkAuth,
  formatError,
  omit,
  res,
  validate,
} from './utils';

export const usersHandlers = [
  rest.post(`${API_URL}/users`, async (req, _, ctx) => {
    try {
      const dto = validate<CreateUserDto>(createUserDto, await req.json());

      const user = db.user.findFirst({
        where: { email: { equals: dto.email } },
      });

      if (user) {
        throw new HttpError(409, formatError('email', 'Email already in use'));
      }

      const result = db.user.create({
        ...dto,
        id: db.user.count() + 1,
      });

      return res(ctx.status(201), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${API_URL}/users`, (req, _, ctx) => {
    try {
      checkAuth(req, [Role.admin]);
      const params = Object.fromEntries([...req.url.searchParams]);
      const { limit, offset, ...dto } = validate<GetUsersDto>(
        getUsersDto,
        params,
        defaultSearchParams,
      );

      const query = buildPaginatedQuery(dto);
      const dataset = db.user.findMany(query);
      const result = {
        hasMore: dataset.length > +offset + +limit,
        total: dataset.length,
        items: dataset
          .slice(+offset, +offset + +limit)
          .map((item) => omit(item, ['password'])),
      };

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${API_URL}/users/:id`, (req, _, ctx) => {
    try {
      checkAuth(req, [Role.admin]);

      const result = db.user.findFirst({
        where: { id: { equals: +req.params.id } },
      });

      if (!result) throw new HttpError(404, 'User not found');

      return res(ctx.status(200), ctx.json(omit(result, ['password'])));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.patch(`${API_URL}/users`, async (req, _, ctx) => {
    try {
      const user = checkAuth(req);
      const dto = validate<UpdateUserDto>(updateUserDto, await req.json());

      const userWithSameEmail = db.user.findFirst({
        where: { email: { equals: dto.email } },
      });

      if (userWithSameEmail) {
        throw new HttpError(409, formatError('email', 'Email already in use'));
      }

      const result = db.user.update({
        where: { id: { equals: user.id } },
        data: { ...dto, updatedAt: new Date().toISOString() },
      })!;

      return res(ctx.status(201), ctx.json(omit(result, ['password'])));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.delete(`${API_URL}/users`, (req, _, ctx) => {
    try {
      const user = checkAuth(req);

      db.user.delete({
        where: { id: { equals: user.id } },
      });

      return res(ctx.status(200));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),
];
