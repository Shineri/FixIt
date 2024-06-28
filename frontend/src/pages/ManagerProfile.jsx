import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManagerProfile = () => {
    const [managerDetails, setManagerDetails] = useState({
        fullName: '',
        email: '',
        pincode: '',
        state: '',
        city: '',
        roadName_area_colony: []
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchManagerDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT in localStorage
                    }
                });
                setManagerDetails(response.data);
            } catch (error) {
                setError('Error fetching manager details');
                console.error('Manager Profile Error:', error);
            }
        };

        fetchManagerDetails();
    }, []);

    return (
        <div className="container mx-auto flex justify-center px-6 my-12">
            <div className="w-2/3 bg-white p-5 rounded-lg border">
                <div className="px-8 mb-4 text-center">
                    <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">Manager Profile</h1>
                </div>
                <div className="px-8 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">Name:</p>
                        <p>{managerDetails.fullName}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">Email:</p>
                        <p>{managerDetails.email}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">Pincode:</p>
                        <p>{managerDetails.pincode}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">State:</p>
                        <p>{managerDetails.state}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">City:</p>
                        <p>{managerDetails.city}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">Road/Area/Colony:</p>
                        <p>{managerDetails.roadName_area_colony.join(', ')}</p>
                    </div>
                </div>
                <div className="px-8 mb-4 text-center">
                    <Link to="/ManagerDashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Dashboard
                    </Link>
                    <Link to="/AllWorkers" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                        Workers List
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ManagerProfile;
