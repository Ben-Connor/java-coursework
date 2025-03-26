import { 
  createRootRoute, 
  createRoute, 
  RouterProvider, 
  createRouter, 
  Route 
} from '@tanstack/react-router';
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
  getParentRoute: () => rootRoute,
  path: '/food-search',
  component: FoodSearch,
});

const routeTree = rootRoute.addChildren([homeRoute, foodSearchRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}
