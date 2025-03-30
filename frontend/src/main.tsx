import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
