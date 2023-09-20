import { lazy } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
const Register = lazy(() => import('./Register').then(({ Register }) => ({ default: Register })));
// eslint-disable-next-line react-refresh/only-export-components
const Login = lazy(() => import('./Login').then(({ Login }) => ({ default: Login })));

export const authRoutes = {
  path: 'auth/*', children: [
    { path: 'register', element: <Register /> },
    { path: 'login', element: <Login /> }
    // <Route path="*" element={<Navigate to="/" />} />
  ]
};