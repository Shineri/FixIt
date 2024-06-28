import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Mock data
const mockWorkers = [
    {
        _id: '1',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNo: '1234567890',
        services: ['Electrician', 'Plumber'],
        manager: 'managerId1', // Assuming manager ID
    },
    {
        _id: '2',
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        phoneNo: '9876543210',
        services: ['Electrician', 'Carpenter'],
        manager: 'managerId1', // Assuming manager ID
    },
    {
        _id: '3',
        fullName: 'Michael Brown',
        email: 'michael.brown@example.com',
        phoneNo: '5551234567',
        services: ['Electrician'],
        manager: 'managerId2', // Assuming manager ID
    },
    {
        _id: '4',
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phoneNo: '4449876543',
        services: ['Electrician', 'Plumber'],
        manager: 'managerId2', // Assuming manager ID
    },
    {
        _id: '5',
        fullName: 'David Wilson',
        email: 'david.wilson@example.com',
        phoneNo: '2223334444',
        services: ['Electrician', 'Carpenter'],
        manager: 'managerId3', // Assuming manager ID
    },
];

const AllWorkers = () => {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        // Simulate fetching workers from API or database
        setWorkers(mockWorkers);
    }, []);

    const handleAddWorker = async () => {
        // Simulate adding a new worker
        const newWorker = {
            fullName: 'New Worker',
            email: 'new.worker@example.com',
            phoneNo: '1234567890',
            services: ['Electrician'],
            manager: 'managerId1', // Assuming manager ID
        };

        // Here you can use axios to send a POST request to your backend API to add the worker
        try {
            const response = await axios.post('/api/workers', newWorker);
            console.log('New worker added:', response.data);
            setWorkers([...workers, response.data]); // Update state with the new worker
        } catch (error) {
            console.error('Error adding new worker:', error.message);
        }
    };

    const handleDeleteWorker = async (workerId) => {
        // Simulate deleting a worker
        try {
            const response = await axios.delete(`/api/workers/${workerId}`);
            console.log('Worker deleted:', response.data);
            setWorkers(workers.filter(worker => worker._id !== workerId)); // Update state by filtering out the deleted worker
        } catch (error) {
            console.error('Error deleting worker:', error.message);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-2/3 bg-white p-5 rounded-lg border">
                    <div className="px-8 mb-4 text-center">
                        <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">All Workers</h1>
                    </div>
                    <div className="px-8 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">List of Workers</h2>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                onClick={handleAddWorker}
                            >
                                Add Worker
                            </button>
                        </div>
                        <ul className="list-decimal ml-5">
                            {workers.map(worker => (
                                <li key={worker._id} className="mb-4 text-black">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-bold">{worker.fullName}</h3>
                                            <p className="text-gray-600">Email: {worker.email}</p>
                                            <p className="text-gray-600">Phone: {worker.phoneNo}</p>
                                            <p className="text-gray-600">Services: {worker.services.join(', ')}</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                                onClick={() => handleDeleteWorker(worker._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllWorkers;
