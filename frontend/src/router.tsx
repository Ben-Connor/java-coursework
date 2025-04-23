import { 
  createRootRoute, 
  createRoute, 
  RouterProvider, 
  createRouter, 
  Route 
} from '@tanstack/react-router';
import Home from './pages/Home';
import App from './App';
import FoodSearch from './pages/FoodSearch';
import Graphs from './pages/Graphs'; 
import BarcodeSearch from './pages/BarcodeSearch';

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

const graphsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/graphs',
  component: Graphs,
});

const barcodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/barcode-search',
  component: BarcodeSearch,
});

const routeTree = rootRoute.addChildren([homeRoute, foodSearchRoute, graphsRoute, barcodeRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}
