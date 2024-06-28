import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for manager details
const mockManagerDetails = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    pincode: '123456',
    state: 'State1',
    city: 'City1',
    roadName_area_colony: ['Colony1']
};

const ManagerProfile = () => {
    return (
        <div className="container mx-auto flex justify-center px-6 my-12">
            <div className="w-2/3 bg-white p-5 rounded-lg border">
                <div className="px-8 mb-4 text-center">
                    <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">Manager Profile</h1>
                </div>
                <div className="px-8 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">Name:</p>
                        <p>{mockManagerDetails.fullName}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">Email:</p>
                        <p>{mockManagerDetails.email}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">Pincode:</p>
                        <p>{mockManagerDetails.pincode}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">State:</p>
                        <p>{mockManagerDetails.state}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">City:</p>
                        <p>{mockManagerDetails.city}</p>
                    </div>
                    <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <p className="font-bold">Road/Area/Colony:</p>
                        <p>{mockManagerDetails.roadName_area_colony.join(', ')}</p>
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
