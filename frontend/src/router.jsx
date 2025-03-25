import { createRootRoute, createRoute, RouterProvider, createRouter } from '@tanstack/react-router';
import Home from './pages/Home';
import App from './App';

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
const routeTree = rootRoute.addChildren([homeRoute]);

const router = createRouter({ routeTree });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
