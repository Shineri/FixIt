import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-500">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-black font-bold text-xl">
          <Link to="/">FIXIT</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/HomePage" className="text-black font-bold bg-white py-2 px-4 rounded hover:bg-gray-200">Home</Link>
          <Link to="/about" className="text-black font-bold bg-white py-2 px-4 rounded hover:bg-gray-200">About</Link>
          <Link to="/CreateAccountPage" className="text-black font-bold bg-white py-2 px-4 rounded hover:bg-gray-200">Sign Up</Link>
          <Link to="/Login" className="text-black font-bold bg-white py-2 px-4 rounded hover:bg-gray-200">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
