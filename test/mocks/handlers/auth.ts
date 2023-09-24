import { API_URL } from '@/config';
import { CreateAuthDto, createAuthDto } from '@/features/auth';
import { rest } from 'msw';
import { db } from '../db';
import {
  HttpError,
  TOKEN,
  checkAuth,
  formatError,
  res,
  validate,
} from '../utils';

const BASE_URL = `${API_URL}/auth`;

export const authHandlers = [
  rest.post(BASE_URL, async (req, _, ctx) => {
    try {
      const dto = validate<CreateAuthDto>(createAuthDto, await req.json());

      const user = db.user.findFirst({
        where: { email: { equals: dto.email } },
      });

      if (!user) {
        throw new HttpError(409, formatError('email', 'Email not in use'));
      }

      if (dto.password !== user.password) {
        throw new HttpError(409, formatError('password', 'Invalid password'));
      }

      db.user.update({
        where: { id: { equals: user.id } },
        data: { online: true },
      })!;

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

  rest.get(BASE_URL, (req, _, ctx) => {
    try {
      const result = checkAuth(req);

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.patch(BASE_URL, (req, _, ctx) => {
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

  rest.delete(BASE_URL, (req, _, ctx) => {
    try {
      checkAuth(req);

      return res(ctx.status(200), ctx.cookie('Authentication', ''));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),
];
