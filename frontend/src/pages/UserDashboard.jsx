import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Updated mock data with additional entries
const mockComplaints = [
    {
        _id: '1',
        userId: '1',
        user: 'User1',
        manager: 'Manager1',
        serviceRequired: 'Electrician',
        description: 'Fix the light in the living room',
        pincode: '123456',
        state: 'State1',
        city: 'City1',
        houseNo_buildingName: ['House1'],
        roadName_area_colony: ['Colony1'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 100,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '2',
        userId: '1',
        user: 'User1',
        manager: 'Manager1',
        serviceRequired: 'Plumber',
        description: 'Fix leaking pipe in the kitchen',
        pincode: '123456',
        state: 'State1',
        city: 'City1',
        houseNo_buildingName: ['House2'],
        roadName_area_colony: ['Colony2'],
        status: 'Resolved',
        assigned_worker: 'Worker1',
        paymentStatus: 'Paid',
        amount: 150,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '3',
        userId: '2',
        user: 'User2',
        manager: 'Manager2',
        serviceRequired: 'Carpenter',
        description: 'Build a new bookshelf',
        pincode: '654321',
        state: 'State2',
        city: 'City2',
        houseNo_buildingName: ['House3'],
        roadName_area_colony: ['Colony3'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 120,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '4',
        userId: '2',
        user: 'User2',
        manager: 'Manager2',
        serviceRequired: 'Electrician',
        description: 'Install new electrical outlets',
        pincode: '654321',
        state: 'State2',
        city: 'City2',
        houseNo_buildingName: ['House4'],
        roadName_area_colony: ['Colony4'],
        status: 'In Progress',
        assigned_worker: 'Worker2',
        paymentStatus: 'Pending',
        amount: 180,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '5',
        userId: '3',
        user: 'User3',
        manager: 'Manager3',
        serviceRequired: 'Plumber',
        description: 'Fix water leak in the bathroom',
        pincode: '987654',
        state: 'State3',
        city: 'City3',
        houseNo_buildingName: ['House5'],
        roadName_area_colony: ['Colony5'],
        status: 'Resolved',
        assigned_worker: 'Worker3',
        paymentStatus: 'Paid',
        amount: 200,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '6',
        userId: '3',
        user: 'User3',
        manager: 'Manager3',
        serviceRequired: 'Electrician',
        description: 'Fix ceiling fan in the bedroom',
        pincode: '987654',
        state: 'State3',
        city: 'City3',
        houseNo_buildingName: ['House6'],
        roadName_area_colony: ['Colony6'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 90,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '7',
        userId: '1',
        user: 'User1',
        manager: 'Manager1',
        serviceRequired: 'Painter',
        description: 'Paint the exterior walls',
        pincode: '123456',
        state: 'State1',
        city: 'City1',
        houseNo_buildingName: ['House3'],
        roadName_area_colony: ['Colony3'],
        status: 'Resolved',
        assigned_worker: 'Worker4',
        paymentStatus: 'Paid',
        amount: 250,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '8',
        userId: '2',
        user: 'User2',
        manager: 'Manager2',
        serviceRequired: 'Gardener',
        description: 'Trim the garden hedges',
        pincode: '654321',
        state: 'State2',
        city: 'City2',
        houseNo_buildingName: ['House7'],
        roadName_area_colony: ['Colony7'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 150,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '9',
        userId: '3',
        user: 'User3',
        manager: 'Manager3',
        serviceRequired: 'Cleaner',
        description: 'Deep clean the kitchen',
        pincode: '987654',
        state: 'State3',
        city: 'City3',
        houseNo_buildingName: ['House8'],
        roadName_area_colony: ['Colony8'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 120,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '10',
        userId: '1',
        user: 'User1',
        manager: 'Manager1',
        serviceRequired: 'Plumber',
        description: 'Fix broken pipe in the basement',
        pincode: '123456',
        state: 'State1',
        city: 'City1',
        houseNo_buildingName: ['House4'],
        roadName_area_colony: ['Colony4'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 110,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
];

const UserDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);

    useEffect(() => {
        const userId = '1'; // Hardcoded user ID for demonstration

        const userComplaints = mockComplaints.filter(complaint => complaint.userId === userId);
        setComplaints(userComplaints);
        setFilteredComplaints(userComplaints);
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-2/3 bg-white p-5 rounded-lg border">
                    <div className="px-8 mb-4 text-center">
                        <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">User Dashboard</h1>
                    </div>
                    <div className="px-8 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                        <ul className="list-decimal ml-5">
                            {filteredComplaints.map((complaint) => (
                                <li key={complaint._id} className="mb-4 text-black">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-dark-red-500">{complaint.description}</p>
                                            <p className="text-red-600">Status: {complaint.status}</p>
                                            <p className="text-gray-600">Created: {new Date(complaint.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button className={`px-4 py-2 rounded ${complaint.status === 'Resolved' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white cursor-not-allowed'}`} disabled>
                                                {complaint.status}
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded ${complaint.status === 'Resolved' ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-500 text-white cursor-not-allowed'}`}
                                                disabled={complaint.status !== 'Resolved'}
                                                onClick={() => alert(`Paying ${complaint.amount} for complaint ${complaint._id}`)}
                                            >
                                                Pay Now
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

export default UserDashboard;
