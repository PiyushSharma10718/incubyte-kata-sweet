// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">🍭 Sweet Shop</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Add
        </Link>
        <Link to="/view" className="hover:underline">
          View
        </Link>
        <Link to="/search" className="hover:underline">
          Search
        </Link>
        <Link to="/sort" className="hover:underline">
          Sort
        </Link>
<<<<<<< HEAD
=======
        
>>>>>>> d10d35dd37d7964531d641c6a78b1a7868673b54
        <Link to="/purchase" className="hover:underline">
          Purchase
        </Link>
        <Link to="/restock" className="hover:underline">
          Restock
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
