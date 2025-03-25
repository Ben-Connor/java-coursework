import { Link, Outlet } from '@tanstack/react-router';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <hr />
      <Outlet /> {}
    </div>
  );
}

export default App;
