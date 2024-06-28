// ManagerDashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManagerDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/v2/manager/complaints', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const complaintsData = response.data.length ? response.data : [];
            setComplaints(complaintsData);
            setFilteredComplaints(complaintsData);
        } catch (error) {
            console.error('Error fetching complaints:', error);
            setComplaints([]);
            setFilteredComplaints([]);
            // Handle error, e.g., show a message to the user
        }
    };

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
                        {Array.isArray(filteredComplaints) && filteredComplaints.length === 0 ? (
                            <p className="text-center text-gray-700">No complaints found.</p>
                        ) : (
                            <ul className="list-decimal ml-5">
                                {Array.isArray(filteredComplaints) && filteredComplaints.map((complaint) => (
                                    <li key={complaint._id} className="mb-4 text-black">
                                        <div className="flex justify-between items-center">
                                            <div>
                                            {console.log(complaint._id)} 
                                                <Link
                                                    to={`/complaint/${complaint._id}`}
                                                    className="text-dark-red-500 hover:underline"
                                                >
                                                    {complaint.description}
                                                </Link>
                                                <p className="text-red-600">Status: {complaint.status}</p>
                                                <p className="text-gray-600">Created: {new Date(complaint.createdAt).toLocaleString()}</p>
                                            </div>
                                            {complaint.status === 'Pending' && (
                                            <Link
                                            to= {`/Workers?complaintId=${complaint._id}`}
                                            className="text-black bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
                                        >
                                            Assign Worker
                                        </Link>
                                               /* <Link
                                                    to={{
                                                        pathname: `/workers`,
                                                        state: { complaintId: complaint._id }
                                                    }}
                                                    className="text-black bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
                                                >
                                                    Assign Worker
                                                </Link>*/
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
