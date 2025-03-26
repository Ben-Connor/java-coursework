import { Link, Outlet } from '@tanstack/react-router';
import FoodSearch from './FoodSearch';

function App() {
  return (
    <div>
      <nav>
        {/* <Link to="/">Home</Link> */}
        <a href="/">Home</a> | <a href="/food-search">Food Search</a> | <a href ="/graphs">Graphs </a>
      </nav>
      <hr />
      <Outlet /> {}
    </div>
  );
}

export default App;
