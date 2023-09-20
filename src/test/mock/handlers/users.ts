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
import { default as users } from '../data/user.json';
import {
  HttpError,
  checkAuth,
  exclude,
  findAndCount,
  formatError,
  res,
  validate,
} from './utils';

export const usersHandlers = [
  rest.post(`${API_URL}/users`, async (req, _, ctx) => {
    try {
      const dto = validate<CreateUserDto>(createUserDto, await req.json());
      const user = users.find(({ email }) => email == dto.email);
      if (user) {
        throw new HttpError(409, formatError('email', 'Email already in use'));
      }
      const now = new Date().toISOString();
      const result = {
        ...dto,
        id: users.length + 1,
        online: false,
        role: Role.customer,
        createdAt: now,
        updatedAt: now,
      };

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
      const dto = validate<GetUsersDto>(
        getUsersDto,
        params,
        defaultSearchParams,
      );
      const result = findAndCount<(typeof users)[number]>(users, dto);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result.items = result.items.map((item) => exclude(item, ['password']));

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${API_URL}/users/:id`, (req, _, ctx) => {
    try {
      checkAuth(req, [Role.admin]);
      const result = users.find(({ id }) => id === +req.params.id);
      if (!result) throw new HttpError(404, 'User not found');

      return res(ctx.status(200), ctx.json(exclude(result, ['password'])));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.patch(`${API_URL}/users`, async (req, _, ctx) => {
    try {
      const user = checkAuth(req);
      const dto = validate<UpdateUserDto>(updateUserDto, await req.json());
      const userWithSameEmail = users.find(({ email }) => email == dto.email);
      if (userWithSameEmail) {
        throw new HttpError(409, formatError('email', 'Email already in use'));
      }
      const updatedAt = new Date().toISOString();
      const result = { ...user, ...dto, updatedAt };

      return res(ctx.status(201), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.delete(`${API_URL}/users`, (req, _, ctx) => {
    try {
      checkAuth(req);

      return res(ctx.status(200));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),
];
