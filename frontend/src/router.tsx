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
import UploadPhoto from './pages/UploadPhoto';
import Webcam from './pages/Webcam';

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

const uploadPhotoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/upload-photo',
  component: UploadPhoto
  
});

const webcamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/webcam',
  component: Webcam,
  
});


const routeTree = rootRoute.addChildren([homeRoute, foodSearchRoute, graphsRoute, uploadPhotoRoute, webcamRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}
