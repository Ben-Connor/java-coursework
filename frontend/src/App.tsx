import { Link, Outlet } from '@tanstack/react-router';
import React from 'react';
import FoodSearch from './pages/FoodSearch';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        {/* <Link to="/">Home</Link> */}
        <a href="/">Home</a> | <a href="/food-search">Food Search</a> | <a href ="/graphs">Graphs </a> | <a href="/upload-photo">Upload Photo</a> | <a href= "/webcam">Take Photo</a>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default App;
