import { Link, Outlet } from '@tanstack/react-router';
import React from 'react';
import FoodSearch from './FoodSearch';

const App: React.FC = () => {
    return (
        <div>
            <nav>
                {/* <Link to="/">Home</Link> */}
                <a href="/">Home</a> | <a href="/food-search">Food Search</a> |{' '}
                <a href="/food-entry">Manual Entry</a>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
};

export default App;
