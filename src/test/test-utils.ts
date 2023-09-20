import { App } from '@/App';
import { API_URL } from '@/config';
import { CreateUserDto, Role } from '@/features/users';
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { default as users } from './mock/data/user.json';
import { CreateCategoryDto } from '@/features/categories';
import { CreateProductDto } from '@/features/products';

export * from '@testing-library/react';
export { rtlRender, userEvent };

export const mockUser = (options?: CreateUserDto) => {
  const data = {
    name: 'Hercule Eskrigge',
    email: 'heskrigge0@youtube.com',
    password: '0p9o8i7u',
  };

  return { ...data, ...options };
};

export const mockCategory = (options?: CreateCategoryDto) => {
  const data = {
    name: 'Sneakers',
    image: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
  };

  return { ...data, ...options };
};

export const mockProduct = (options?: CreateProductDto) => {
  const data = {
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
  };

  return { ...data, ...options };
};

export const getUser = (role: Role) => {
  return users.find((user) => user.role === role);
};
// const initializeUser = async (user: any) => {
//   if (typeof user === 'undefined') {
//     return await loginAsUser(await createUser());
//   } else if (user) {
//     return await loginAsUser(user);
//   } else {
//     return null;
//   }
// };

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
