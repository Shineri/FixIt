import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-500">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center h-full">
          <img src="/images/Logo.jpg" className="h-10 w-10" alt="Logo" />
          <div className="text-black font-bold text-xl ml-2">
            {/* <Link to="/HomePage">FIXIT</Link> */}
            <p>Fixit</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to="/HomePage" className="text-black font-bold bg-white py-2 px-4 rounded hover:bg-gray-200">Home</Link>
          <Link to="/About" className="text-black font-bold bg-white py-2 px-4 rounded hover:bg-gray-200">About</Link>
          <Link to="/CreateAccountPage" className="text-black font-bold bg-white py-2 px-4 rounded hover:bg-gray-200">Sign Up</Link>
          <Link to="/Login" className="text-black font-bold bg-white py-2 px-4 rounded hover:bg-gray-200">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;