import { App } from '@/App';
import { API_URL } from '@/config';
import { CreateCategoryDto } from '@/features/categories';
import { CreateProductDto } from '@/features/products';
import { CreateUserDto } from '@/features/users';
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { db } from './mock-server/db';

export * from '@testing-library/react';
export { rtlRender, userEvent };

export const render = async (
  ui: ReactElement,
  { route = '/', user, ...rest }: Record<string, unknown> = {},
) => {
  if (user) {
    await fetch(API_URL + `/auth`, {
      body: JSON.stringify(user),
      method: 'POST',
    });
  }

  window.history.pushState({}, 'Test page', route as string);

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: App,
      ...rest,
    }),
    user,
  };

  await waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );

  return returnValue;
};

export const mockUser = (options?: CreateUserDto) => ({
  name: 'Hercule Eskrigge',
  email: 'heskrigge0@youtube.com',
  password: '0p9o8i7u',
  ...options,
});

export const mockCategory = (options?: CreateCategoryDto) => ({
  name: 'Sneakers',
  image: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
  ...options,
});

export const mockProduct = (options?: CreateProductDto) => ({
  name: 'PUMA All-Day Active',
  description: 'Men`s sports shoes All Day Active for an active lifestyle.',
  category_id: 1,
  price: 877.99,
  quantity: 94,
  preview: 'http://dummyimage.com/250x250.png/dddddd/000000',
  images: [
    'http://dummyimage.com/500x500.png/cc0000/ffffff',
    'http://dummyimage.com/500x500.png/5fa2dd/ffffff',
    'http://dummyimage.com/500x500.png/dddddd/000000',
  ],
  ...options,
});

export const createUser = (options?: CreateUserDto) => {
  const user = mockUser(options);
  return db.user.create(user);
};

export const createCategory = (options?: CreateCategoryDto) => {
  const category = mockCategory(options);
  return db.category.create(category);
};

export const createProduct = (options?: CreateProductDto) => {
  const product = mockProduct(options);
  return db.product.create(product);
};
