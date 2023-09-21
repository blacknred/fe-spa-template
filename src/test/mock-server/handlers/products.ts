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
import { db } from '../db';
import {
  HttpError,
  buildPaginatedQuery,
  checkAuth,
  formatError,
  pick,
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

      const category = db.category.findFirst({
        where: { id: { equals: dto.categoryId } },
      });

      if (!category) {
        throw new HttpError(
          409,
          formatError('categoryId', 'Category not exists'),
        );
      }

      const product = db.product.create({
        ...dto,
        id: db.product.count() + 1,
        authorId: user.id,
        categoryId: category.id,
      });

      const result = {
        ...product,
        author: user,
        category: category,
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
      const { limit, offset, ...dto } = validate<GetProductsDto>(
        getProductsDto,
        params,
        defaultSearchParams,
      );

      const query = buildPaginatedQuery(dto);
      const dataset = db.product.findMany(query);

      const result = {
        hasMore: dataset.length > +offset + +limit,
        total: dataset.length,
        items: dataset
          .slice(+offset, +offset + +limit)
          .map(({ authorId, categoryId, ...rest }) => {
            const category = db.category.findFirst({
              where: { id: { equals: +categoryId } },
            });

            const author = db.user.findFirst({
              where: { id: { equals: +authorId } },
            })!;

            return { ...rest, category, author: pick(author, ['id', 'name']) };
          }),
      };

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.get(`${API_URL}/products/:id`, (req, _, ctx) => {
    try {
      const product = db.product.findFirst({
        where: { id: { equals: +req.params.id } },
      });

      if (!product) throw new HttpError(404, 'Product not found');

      const { categoryId, authorId, ...rest } = product;

      const category = db.category.findFirst({
        where: { id: { equals: +categoryId } },
      });

      const author = db.user.findFirst({
        where: { id: { equals: +authorId } },
      })!;

      const result = {
        ...rest,
        category,
        author: pick(author, ['id', 'name']),
      };

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

      const product = db.product.findFirst({
        where: { id: { equals: +req.params.id } },
      });

      if (!product) throw new HttpError(404, 'Product not found');

      if (user.role !== Role.admin && product.authorId !== user.id) {
        throw new HttpError(403, 'Not allowed');
      }

      const category = db.category.findFirst({
        where: { id: { equals: dto.categoryId || +product.categoryId } },
      });

      if (!category) {
        throw new HttpError(
          409,
          formatError('categoryId', 'Category not exists'),
        );
      }

      const author = db.user.findFirst({
        where: { id: { equals: +product.authorId } },
      })!;

      const newProduct = db.product.update({
        where: { id: { equals: category.id } },
        data: { ...dto, updatedAt: new Date().toISOString() },
      });

      const result = {
        ...newProduct,
        category,
        author: pick(author, ['id', 'name']),
      };

      return res(ctx.status(200), ctx.json(result));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),

  rest.delete(`${API_URL}/products/:id`, (req, _, ctx) => {
    try {
      const user = checkAuth(req, [Role.admin, Role.manager]);

      const product = db.product.findFirst({
        where: { id: { equals: +req.params.id } },
      });

      if (!product) throw new HttpError(404, 'Product not found');

      if (user.role !== Role.admin && product.authorId !== user.id) {
        throw new HttpError(403, 'Not allowed');
      }

      db.product.delete({
        where: { id: { equals: +req.params.id } },
      });

      return res(ctx.status(200));
    } catch (e: unknown) {
      const err = e instanceof HttpError ? e : new HttpError();
      return err.res(ctx);
    }
  }),
];
