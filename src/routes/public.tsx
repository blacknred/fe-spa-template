import { authRoutes, useAuth } from '@/features/auth';
import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const Landing = lazy(() => import('@/features/misc').then(({ Landing }) => ({ default: Landing })));

// eslint-disable-next-line react-refresh/only-export-components
const Public = () => {
  const { profile } = useAuth();

  if (!profile) return <Outlet />;
  return <Navigate to="/app" replace />;
}

export const publicRoutes = {
  element: <Public />, children: [
    authRoutes,
    { path: '/', element: <Landing /> },
    { path: '*', element: <Navigate to="/" /> }
  ]
}

