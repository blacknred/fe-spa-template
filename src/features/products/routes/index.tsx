import { lazy } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
const Products = lazy(() => import('./Products').then(({ Products }) => ({ default: Products })));
// eslint-disable-next-line react-refresh/only-export-components
const Product = lazy(() => import('./Product').then(({ Product }) => ({ default: Product })));

export const productsRoutes = {
  path: 'products', children: [
    { index: true, element: <Products /> },
    { path: ':id', element: <Product /> }
  ]
};