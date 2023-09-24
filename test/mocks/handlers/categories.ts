import { API_URL } from '@/config';
import {
  CreateCategoryDto,
  GetCategoriesDto,
  UpdateCategoryDto,
  createCategoryDto,
  getCategoriesDto,
  updateCategoryDto,
} from '@/features/categories';
import { Role } from '@/features/users';
import { defaultSearchParams } from '@/utils';
import { rest } from 'msw';
import { db } from '../db';
import {
  HttpError,
  buildPaginatedQuery,
  checkAuth,
  formatError,
  res,
  validate,
} from '../utils';

const BASE_URL = `${API_URL}/categories`;

export const categoriesHandlers = [
  rest.post(BASE_URL, async (req, _, ctx) => {
    try {
      const user = checkAuth(req, [Role.admin]);
      const dto = validate<CreateCategoryDto>(
        createCategoryDto,
        await req.json(),
      );

      const category = db.category.findFirst({
        where: { name: { equals: dto.name } },
      });

      if (category) {
        throw new HttpError(409, formatError('name', 'Name already in use'));
      }

      const result = db.category.create({
        ...dto,
        id: db.category.count() + 1,
        authorId: user.id,
      });

      return res(ctx.status(201), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(BASE_URL, (req, _, ctx) => {
    try {
      const params = Object.fromEntries([...req.url.searchParams]);
      const { limit, offset, ...dto } = validate<GetCategoriesDto>(
        getCategoriesDto,
        params,
        defaultSearchParams,
      );

      const query = buildPaginatedQuery(dto);
      const dataset = db.category.findMany(query);
      const result = {
        hasMore: dataset.length > +offset + +limit,
        items: dataset.slice(+offset, +offset + +limit),
        total: dataset.length,
      };

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${BASE_URL}/:id`, (req, _, ctx) => {
    try {
      const result = db.category.findFirst({
        where: { id: { equals: +req.params.id } },
      });

      if (!result) throw new HttpError(404, 'Category not found');
      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.patch(`${BASE_URL}/:id`, async (req, _, ctx) => {
    try {
      checkAuth(req, [Role.admin]);
      const dto = validate<UpdateCategoryDto>(
        updateCategoryDto,
        await req.json(),
      );

      const category = db.category.findFirst({
        where: { id: { equals: +req.params.id } },
      });

      if (!category) throw new HttpError(404, 'Category not found');

      const result = db.category.update({
        where: { id: { equals: category.id } },
        data: { ...dto, updatedAt: new Date().toISOString() },
      });

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.delete(`${BASE_URL}/:id`, (req, _, ctx) => {
    try {
      checkAuth(req, [Role.admin]);

      const category = db.category.findFirst({
        where: { id: { equals: +req.params.id } },
      });

      if (!category) throw new HttpError(404, 'Category not found');

      const product = db.product.findFirst({
        where: { categoryId: { equals: category.id } },
      });

      if (product) {
        throw new HttpError(409, 'Category in use');
      }

      db.category.delete({
        where: { id: { equals: +req.params.id } },
      });

      return res(ctx.status(200));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),
];
