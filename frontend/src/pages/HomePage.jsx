import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Complaint Center</h1>
                <p className="mb-4">Please register your complaint here:</p>
                <Link to="/ComplainForm" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">Register Complaint</Link>
            </div>
        </div>
    );
}

export default HomePage;
