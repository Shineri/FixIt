import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data
const mockComplaints = [
    {
        _id: '1',
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
        user: 'User2',
        manager: 'Manager2',
        serviceRequired: 'Plumber',
        description: 'Fix the kitchen sink',
        pincode: '654321',
        state: 'State2',
        city: 'City2',
        houseNo_buildingName: ['House2'],
        roadName_area_colony: ['Colony2'],
        status: 'In Progress',
        assigned_worker: 'Worker1',
        paymentStatus: 'Paid',
        amount: 200,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '3',
        user: 'User3',
        manager: 'Manager3',
        serviceRequired: 'Carpenter',
        description: 'Repair the dining table',
        pincode: '789012',
        state: 'State3',
        city: 'City3',
        houseNo_buildingName: ['House3'],
        roadName_area_colony: ['Colony3'],
        status: 'Resolved',
        assigned_worker: 'Worker2',
        paymentStatus: 'Paid',
        amount: 150,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '4',
        user: 'User4',
        manager: 'Manager4',
        serviceRequired: 'Electrician',
        description: 'Install new ceiling fan',
        pincode: '345678',
        state: 'State4',
        city: 'City4',
        houseNo_buildingName: ['House4'],
        roadName_area_colony: ['Colony4'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 80,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '5',
        user: 'User5',
        manager: 'Manager5',
        serviceRequired: 'Plumber',
        description: 'Unclog bathroom drain',
        pincode: '901234',
        state: 'State5',
        city: 'City5',
        houseNo_buildingName: ['House5'],
        roadName_area_colony: ['Colony5'],
        status: 'In Progress',
        assigned_worker: 'Worker3',
        paymentStatus: 'Pending',
        amount: 120,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '6',
        user: 'User6',
        manager: 'Manager6',
        serviceRequired: 'Carpenter',
        description: 'Fix the wardrobe door',
        pincode: '567890',
        state: 'State6',
        city: 'City6',
        houseNo_buildingName: ['House6'],
        roadName_area_colony: ['Colony6'],
        status: 'Resolved',
        assigned_worker: 'Worker4',
        paymentStatus: 'Paid',
        amount: 170,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '7',
        user: 'User7',
        manager: 'Manager7',
        serviceRequired: 'Electrician',
        description: 'Replace broken socket',
        pincode: '234567',
        state: 'State7',
        city: 'City7',
        houseNo_buildingName: ['House7'],
        roadName_area_colony: ['Colony7'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 60,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '8',
        user: 'User8',
        manager: 'Manager8',
        serviceRequired: 'Plumber',
        description: 'Fix leaking faucet',
        pincode: '890123',
        state: 'State8',
        city: 'City8',
        houseNo_buildingName: ['House8'],
        roadName_area_colony: ['Colony8'],
        status: 'In Progress',
        assigned_worker: 'Worker5',
        paymentStatus: 'Pending',
        amount: 110,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '9',
        user: 'User9',
        manager: 'Manager1',
        serviceRequired: 'Electrician',
        description: 'Repair faulty wiring in the attic',
        pincode: '543210',
        state: 'State9',
        city: 'City9',
        houseNo_buildingName: ['House9'],
        roadName_area_colony: ['Colony9'],
        status: 'Resolved',
        assigned_worker: 'Worker6',
        paymentStatus: 'Paid',
        amount: 130,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '10',
        user: 'User10',
        manager: 'Manager2',
        serviceRequired: 'Plumber',
        description: 'Install new shower fixtures',
        pincode: '432109',
        state: 'State10',
        city: 'City10',
        houseNo_buildingName: ['House10'],
        roadName_area_colony: ['Colony10'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 90,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '11',
        user: 'User11',
        manager: 'Manager3',
        serviceRequired: 'Carpenter',
        description: 'Build custom shelves for the study',
        pincode: '678901',
        state: 'State11',
        city: 'City11',
        houseNo_buildingName: ['House11'],
        roadName_area_colony: ['Colony11'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 140,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    },
    {
        _id: '12',
        user: 'User12',
        manager: 'Manager4',
        serviceRequired: 'Electrician',
        description: 'Install security lights in the backyard',
        pincode: '789012',
        state: 'State12',
        city: 'City12',
        houseNo_buildingName: ['House12'],
        roadName_area_colony: ['Colony12'],
        status: 'In Progress',
        assigned_worker: 'Worker7',
        paymentStatus: 'Pending',
        amount: 160,
        createdAt: new Date(),
        availabilitySlot: 'Afternoon'
    },
    {
        _id: '13',
        user: 'User13',
        manager: 'Manager5',
        serviceRequired: 'Plumber',
        description: 'Fix broken toilet flush',
        pincode: '543210',
        state: 'State13',
        city: 'City13',
        houseNo_buildingName: ['House13'],
        roadName_area_colony: ['Colony13'],
        status: 'Pending',
        assigned_worker: null,
        paymentStatus: 'Pending',
        amount: 100,
        createdAt: new Date(),
        availabilitySlot: 'Morning'
    }
];

const ManagerDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        setComplaints(mockComplaints);
        setFilteredComplaints(mockComplaints);
    }, []);

    const handleFilterChange = (event) => {
        const status = event.target.value;
        setFilterStatus(status);
        if (status === 'All') {
            setFilteredComplaints(complaints);
        } else {
            setFilteredComplaints(complaints.filter(complaint => complaint.status === status));
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-2/3 bg-white p-5 rounded-lg border">
                    <div className="px-8 mb-4 text-center">
                        <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">Manager Dashboard</h1>
                    </div>
                    <div className="px-8 mb-4">
                        <label htmlFor="statusFilter" className="block mb-2 text-sm font-bold text-gray-700">
                            Filter by Status:
                        </label>
                        <select
                            id="statusFilter"
                            value={filterStatus}
                            onChange={handleFilterChange}
                            className="w-full px-3 py-2 text-sm leading-tight text-black-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                    <div className="px-8 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                        <ul className="list-decimal ml-5">
                            {filteredComplaints.map((complaint) => (
                                <li key={complaint._id} className="mb-4 text-black">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Link
                                                to={`/complaint/${complaint._id}`}
                                                className="text-dark-red-500 hover:underline"
                                            >
                                                {complaint.description}
                                            </Link>
                                            <p className="text-red-600">Status: {complaint.status}</p>
                                            <p className="text-gray-600">Created: {new Date(complaint.createdAt).toLocaleString()}</p>
                                        </div>
                                        <Link
                                            to={`/workers?complaintId=${complaint._id}`}
                                            className="text-black bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
                                        >
                                            Assign Worker
                                        </Link>
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

export default ManagerDashboard;
