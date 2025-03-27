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
import ManualFoodEntry from './pages/ManualFoodEntry';

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

const manualFoodEntryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/food-entry',
  component: ManualFoodEntry,
});

const routeTree = rootRoute.addChildren([homeRoute, foodSearchRoute, manualFoodEntryRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}
