import { createRootRoute, createRoute, RouterProvider, createRouter } from '@tanstack/react-router';
import Home from './pages/Home';
import App from './App';
import FoodSearch from './FoodSearch';
import Graphs from './Graphs'; 

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

const graphsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/graphs',
  component: Graphs,
});

const routeTree = rootRoute.addChildren([homeRoute, foodSearchRoute, graphsRoute]);

const router = createRouter({ routeTree });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
