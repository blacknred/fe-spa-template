import { lazy } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
const Users = lazy(() => import('./Users').then(({ Users }) => ({ default: Users })));
// eslint-disable-next-line react-refresh/only-export-components
const User = lazy(() => import('./User').then(({ User }) => ({ default: User })));

export const usersRoutes = {
  path: 'users', children: [
    { index: true, element: <Users /> },
    { path: ':id', element: <User /> }
  ]
};