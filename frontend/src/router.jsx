import { createRootRoute, createRoute, RouterProvider, createRouter } from '@tanstack/react-router';
import Home from './pages/Home';
import App from './App';
import FoodSearch from './FoodSearch';

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const foodSearchRoute = createRoute({
  getParentRoute: () => rootRoute, // It's a child of the root route
  path: '/food-search', // The path that will render the FoodSearch component
  component: FoodSearch, // FoodSearch component will render here
});

const routeTree = rootRoute.addChildren([homeRoute, foodSearchRoute]);

const router = createRouter({ routeTree });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
