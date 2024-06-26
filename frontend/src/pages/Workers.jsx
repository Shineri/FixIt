import React, { useEffect, useState } from 'react';

// Mock data for demonstration
const mockWorkers = [
    {
        _id: '1',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNo: '1234567890',
        services: ['Electrician', 'Plumber'],
        manager: 'managerId1', // Assuming manager ID
        assigned: false,
    },
    {
        _id: '2',
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        phoneNo: '9876543210',
        services: ['Electrician', 'Carpenter'],
        manager: 'managerId1', // Assuming manager ID
        assigned: false,
    },
    {
        _id: '3',
        fullName: 'Michael Brown',
        email: 'michael.brown@example.com',
        phoneNo: '5551234567',
        services: ['Electrician'],
        manager: 'managerId2', // Assuming manager ID
        assigned: false,
    },
    {
        _id: '4',
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phoneNo: '4449876543',
        services: ['Electrician', 'Plumber'],
        manager: 'managerId2', // Assuming manager ID
        assigned: false,
    },
    {
        _id: '5',
        fullName: 'David Wilson',
        email: 'david.wilson@example.com',
        phoneNo: '2223334444',
        services: ['Electrician', 'Carpenter'],
        manager: 'managerId3', // Assuming manager ID
        assigned: false,
    },
];

const WorkersPage = () => {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        // Simulating API call to fetch workers based on service type
        const fetchWorkers = async () => {
            // Simulate fetching workers for 'Electrician' service
            const filteredWorkers = mockWorkers.filter(worker =>
                worker.services.includes('Electrician')
            );
            setWorkers(filteredWorkers);
        };

        fetchWorkers();
    }, []);

    const assignWorker = (workerId) => {
        // Placeholder function to assign worker to a complaint
        console.log(`Assign worker with ID ${workerId} to complaint`);
        // Implement logic to assign worker to complaint
        const updatedWorkers = workers.map(worker => {
            if (worker._id === workerId) {
                return { ...worker, assigned: true };
            }
            return worker;
        });
        setWorkers(updatedWorkers);
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg border">
                    <div className="px-8 mb-4 text-center">
                        <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">
                            Available Workers for Electrician
                        </h1>
                    </div>
                    <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                        {workers.length === 0 ? (
                            <p className="text-center">No workers available for this service.</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {workers.map(worker => (
                                    <div key={worker._id} className="flex justify-between items-center border-b py-2 px-4">
                                        <div>
                                            <h2 className="text-lg font-bold">{worker.fullName}</h2>
                                            <p className="text-gray-600">{worker.services.join(', ')}</p>
                                            <p className="text-gray-600">Contact: {worker.phoneNo}</p>
                                        </div>
                                        <div className="relative">
                                            {!worker.assigned ? (
                                                <button
                                                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                                    onClick={() => assignWorker(worker._id)}
                                                >
                                                    Assign to Complaint
                                                </button>
                                            ) : (
                                                <button
                                                    className="px-4 py-2 bg-gray-400 text-black rounded-full cursor-not-allowed"
                                                    disabled
                                                >
                                                    Assigned
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkersPage;
