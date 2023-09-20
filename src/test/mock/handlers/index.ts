import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import { authHandlers } from './auth';
import { categoriesHandlers } from './categories';
import { productsHandlers } from './products';
import { usersHandlers } from './users';

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  ...categoriesHandlers,
  ...usersHandlers,
  ...productsHandlers,
  ...authHandlers,
];
