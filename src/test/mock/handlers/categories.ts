import { API_URL } from '@/config';
import {
  Category,
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
import { default as categories } from '../data/category.json';
import { default as products } from '../data/product.json';
import {
  HttpError,
  checkAuth,
  findAndCount,
  formatError,
  res,
  validate,
} from './utils';

export const categoriesHandlers = [
  rest.post(`${API_URL}/categories`, async (req, _, ctx) => {
    try {
      const user = checkAuth(req, [Role.admin]);
      const dto = validate<CreateCategoryDto>(
        createCategoryDto,
        await req.json(),
      );
      const category = categories.find(({ name }) => name == dto.name);
      if (category) {
        throw new HttpError(409, formatError('name', 'Name already in use'));
      }
      const now = new Date().toISOString();
      const result = {
        ...dto,
        id: categories.length + 1,
        authorId: user.id,
        createdAt: now,
        updatedAt: now,
      };

      return res(ctx.status(201), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${API_URL}/categories`, (req, _, ctx) => {
    try {
      const params = Object.fromEntries([...req.url.searchParams]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const dto = validate<GetCategoriesDto>(
        getCategoriesDto,
        params,
        defaultSearchParams,
      );
      const result = findAndCount<Category>(categories, dto);

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${API_URL}/categories/:id`, (req, _, ctx) => {
    try {
      const result = categories.find(({ id }) => id === +req.params.id);
      if (!result) throw new HttpError(404, 'Category not found');

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.patch(`${API_URL}/categories/:id`, async (req, _, ctx) => {
    try {
      checkAuth(req, [Role.admin]);
      const dto = validate<UpdateCategoryDto>(
        updateCategoryDto,
        await req.json(),
      );
      const category = categories.find(({ id }) => id === +req.params.id);
      if (!category) throw new HttpError(404, 'Category not found');
      const updatedAt = new Date().toISOString();
      const result = { ...category, ...dto, updatedAt };

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.delete(`${API_URL}/categories/:id`, (req, _, ctx) => {
    try {
      checkAuth(req, [Role.admin]);
      const category = categories.find(({ id }) => id === +req.params.id);
      if (!category) throw new HttpError(404, 'Category not found');
      const product = products.find((p) => p.category_id === category.id);
      if (product) {
        throw new HttpError(409, 'Category in use');
      }

      return res(ctx.status(200));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),
];
