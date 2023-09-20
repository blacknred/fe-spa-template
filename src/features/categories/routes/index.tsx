import { lazy } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
const Categories = lazy(() => import('./Categories').then(({ Categories }) => ({ default: Categories })));
// eslint-disable-next-line react-refresh/only-export-components
const Category = lazy(() => import('./Category').then(({ Category }) => ({ default: Category })));

export const categoriesRoutes = {
  path: 'categories', children: [
    { index: true, element: <Categories /> },
    { path: ':id', element: <Category /> }
  ]
};