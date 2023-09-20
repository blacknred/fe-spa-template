import { API_URL } from '@/config';
import {
  CreateProductDto,
  GetProductsDto,
  Product,
  UpdateProductDto,
  createProductDto,
  getProductsDto,
  updateProductDto,
} from '@/features/products';
import { Role } from '@/features/users';
import { defaultSearchParams } from '@/utils';
import { rest } from 'msw';
import { default as categories } from '../data/category.json';
import { default as products } from '../data/product.json';
import { default as users } from '../data/user.json';
import {
  HttpError,
  checkAuth,
  findAndCount,
  formatError,
  res,
  validate,
} from './utils';

export const productsHandlers = [
  rest.post(`${API_URL}/products`, async (req, _, ctx) => {
    try {
      const user = checkAuth(req, [Role.admin, Role.manager]);
      const dto = validate<CreateProductDto>(
        createProductDto,
        await req.json(),
      );
      const category = categories.find(({ id }) => id === dto.categoryId);
      if (!category) {
        throw new HttpError(
          409,
          formatError('categoryId', 'Category not exists'),
        );
      }
      const now = new Date().toISOString();
      const result = {
        ...dto,
        id: products.length + 1,
        author: user,
        category: category,
        barcode: +now,
        createdAt: now,
        updatedAt: now,
      } as Product;

      return res(ctx.status(201), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${API_URL}/products`, (req, _, ctx) => {
    try {
      const params = Object.fromEntries([...req.url.searchParams]);
      const dto = validate<GetProductsDto>(
        getProductsDto,
        params,
        defaultSearchParams,
      );
      const result = findAndCount<(typeof products)[number]>(products, dto);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result.items = result.items.map(({ author_id, category_id, ...rest }) => {
        const category = categories.find(({ id }) => id === category_id)!;
        const author = users.find(({ id }) => id === author_id)!;
        return { ...rest, author, category };
      });

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${API_URL}/products/:id`, (req, _, ctx) => {
    try {
      const product = products.find(({ id }) => id === +req.params.id);
      if (!product) throw new HttpError(404, 'Product not found');
      const { category_id, author_id, ...rest } = product;
      const category = categories.find(({ id }) => id === category_id);
      const author = users.find(({ id }) => id === author_id);
      const result = { ...rest, category, author } as Product;

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.patch(`${API_URL}/products/:id`, async (req, _, ctx) => {
    try {
      const user = checkAuth(req, [Role.admin, Role.manager]);
      const dto = validate<UpdateProductDto>(
        updateProductDto,
        await req.json(),
      );
      const product = products.find(({ id }) => id === +req.params.id);
      if (!product) throw new HttpError(404, 'Product not found');
      const { category_id, author_id, ...rest } = product;
      if (user.role !== Role.admin && author_id !== user.id) {
        throw new HttpError(403, 'Not allowed');
      }
      const category = categories.find(
        ({ id }) => id === dto.categoryId || category_id,
      );
      if (!category) {
        throw new HttpError(
          409,
          formatError('categoryId', 'Category not exists'),
        );
      }

      const updatedAt = new Date().toISOString();
      const author = users.find(({ id }) => id === author_id);
      const result = { ...rest, category, author, updatedAt } as Product;

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.delete(`${API_URL}/products/:id`, (req, _, ctx) => {
    try {
      const user = checkAuth(req, [Role.admin, Role.manager]);
      const product = products.find(({ id }) => id === +req.params.id);
      if (!product) throw new HttpError(404, 'Product not found');
      if (user.role !== Role.admin && product.author_id !== user.id) {
        throw new HttpError(403, 'Not allowed');
      }

      return res(ctx.status(200));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),
];
