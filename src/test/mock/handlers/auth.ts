import { API_URL } from '@/config';
import { CreateAuthDto, createAuthDto } from '@/features/auth';
import { rest } from 'msw';
import { default as users } from '../data/user.json';
import {
  HttpError,
  TOKEN,
  checkAuth,
  formatError,
  res,
  validate,
} from './utils';
import { Role } from '@/features/users';

export const authHandlers = [
  rest.post(`${API_URL}/auth`, async (req, _, ctx) => {
    try {
      const dto = validate<CreateAuthDto>(createAuthDto, await req.json());
      const user = users.find(({ email }) => email == dto.email);
      if (!user) {
        throw new HttpError(409, formatError('email', 'Email not in use'));
      }
      if (![Role.admin, Role.manager].includes(user.role as Role)) {
        throw new HttpError(403, formatError('email', 'No access'));
      }
      if (dto.password !== user.password) {
        throw new HttpError(409, formatError('password', 'Invalid password'));
      }

      // no Refresh token cookie due msw cookie issue
      return res(
        ctx.status(201),
        ctx.cookie('Authentication', `${TOKEN}_${user.id}`, {
          httpOnly: true,
        }),
      );
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${API_URL}/auth`, (req, _, ctx) => {
    try {
      const result = checkAuth(req);

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.patch(`${API_URL}/auth`, (req, _, ctx) => {
    try {
      // no Refresh token cookie usage due msw cookie issue
      const user = checkAuth(req);

      return res(
        ctx.status(201),
        ctx.cookie('Authentication', `${TOKEN}_${user.id}`, {
          httpOnly: true,
        }),
      );
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.delete(`${API_URL}/auth`, (req, _, ctx) => {
    try {
      checkAuth(req);

      return res(ctx.status(200), ctx.cookie('Authentication', ''));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),
];
