import { Spinner } from "@/components/Elements";
import { useAuth } from "@/features/auth";
import { Suspense } from "react";
import { Await, Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const router = createBrowserRouter([{
    children: [protectedRoutes, publicRoutes],
    element: (
      <>
        <Suspense
          fallback={
            <div className="min-h-screen min-w-full flex items-center justify-center">
              <Spinner size='lg' variant="light" />
            </div>
          }>
          <Await resolve={useAuth.getState().startSession()}>
            <Outlet />
            <ScrollRestoration />
          </Await>
        </Suspense>
      </>
    )
  }])

  return <RouterProvider router={router} />;
};


