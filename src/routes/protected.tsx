import { AppLayout } from '@/components/Layout';
import { useAuth } from '@/features/auth';
import { categoriesRoutes } from '@/features/categories';
import { productsRoutes } from '@/features/products';
import { Role, usersRoutes } from '@/features/users';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const Dashboard = lazy(() => import('@/features/misc').then(({ Dashboard }) => ({ default: Dashboard })));

// eslint-disable-next-line react-refresh/only-export-components
const Protected = () => {
  const { profile, checkRole } = useAuth();
  const location = useLocation();

  if (!profile) return <Navigate to="/" replace state={{ from: location }} />;

  if (location.pathname.endsWith('users') && !checkRole([Role.admin])) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
};

export const protectedRoutes = {
  path: '/app', element: <Protected />, children: [
    categoriesRoutes,
    productsRoutes,
    usersRoutes,
    { path: '', element: <Dashboard /> }
  ]
};
