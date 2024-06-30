/*import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkersPage = () => {
    const [workers, setWorkers] = useState([]);
    const location = useLocation();
   const complaintId = location.state?.complaintId; // Extracting complaintId from location state safely
    console.log(location.state)
    const params = new URLSearchParams(location.search);
const complaintId = params.get("complaintId");
console.log(complaintId);
    useEffect(() => {
        if (complaintId) {
            // Fetch workers based on the service required by the complaint
            const fetchWorkers = async () => {
                try {
                    const response = await axios.get(`/api/v2/manager/workers?complaintId=${complaintId}`);
                    const { Workers } = response.data;
                    setWorkers(Workers);
                } catch (error) {
                    console.error('Error fetching workers:', error.response?.data?.message);
                    toast.error('Error fetching workers. Please try again later.');
                }
            };

            fetchWorkers();
        } else {
            toast.error('Complaint ID not found. Please go back and select a complaint.');
        }
    }, [complaintId]);

    const assignWorker = async (workerId) => {
        try {
            const response = await axios.post('/api/v2/manager/assign-worker', { complaintId, workerId });
            toast.success(response.data.message); // Worker assigned successfully

            // Update the workers state to reflect the assigned worker
            const updatedWorkers = workers.map(worker => {
                if (worker._id === workerId) {
                    return { ...worker, assigned: true };
                }
                return worker;
            });
            setWorkers(updatedWorkers);
        } catch (error) {
            console.error('Error assigning worker:', error.response?.data?.message);
            toast.error('Error assigning worker. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto">
            <ToastContainer />
            <div className="flex justify-center px-6 my-12">
                <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg border">
                    <div className="px-8 mb-4 text-center">
                        <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">
                            {complaintId ? `Available Workers for Complaint ID: ${complaintId}` : 'Complaint ID Not Found'}
                        </h1>
                    </div>
                    <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                        {workers.length === 0 ? (
                            <p className="text-center">No workers available for this complaint.</p>
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

export default WorkersPage;*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkersPage = () => {
    const [workers, setWorkers] = useState([]);
    const location = useLocation();
    
    const params = new URLSearchParams(location.search);
    const complaintId = params.get("complaintId");

    useEffect(() => {
        if (complaintId) {
            fetchWorkers();
        } else {
            toast.error('Complaint ID not found. Please go back and select a complaint.');
        }
    }, [complaintId]);

    const fetchWorkers = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            console.log('Fetching workers for complaint ID:', {complaintId}); // Added logging
            const response = await axios.get(`http://localhost:3000/api/v2/manager/workers/${complaintId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in Authorization header
                }
            });
            console.log('Response from server:', response.data); // Added logging
            const { Workers } = response.data;
            if (Workers && Array.isArray(Workers)) {
                setWorkers(Workers);
                console.log('Workers set in state:', Workers); // Added logging
            } else {
                setWorkers([]);
            }
        } catch (error) {
            
            console.error('Error fetching workers:', error.response?.data?.message || error.message);
            toast.error('Error fetching workers. Please try again later.');
           
        }
    };

    const assignWorker = async (workerId) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            const response = await axios.post('http://localhost:3000/api/v2/manager/assign-worker',{}, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in Authorization header
                }
            });
            toast.success(response.data.message);

            const updatedWorkers = workers.map(worker => {
                if (worker._id === workerId) {
                    return { ...worker, assigned: true };
                }
                return worker;
            });
            setWorkers(updatedWorkers);
            await axios.put('http://localhost:3000/api/v2/manager/assign-worker', { complaintId, status: 'In Progress' }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.href = '/ManagerProfile';
            
        } catch (error) {
            window.location.href = '/ManagerProfile';//bs chck krne ke lye rhene do last me hata denge ;
            console.error('Error assigning worker:', error.response?.data?.message || error.message);
            toast.error('Error assigning worker. Please try again later.');
            
        }
    };

    return (
        <div className="container mx-auto">
            <ToastContainer />
            <div className="flex justify-center px-6 my-12">
                <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg border">
                    <div className="px-8 mb-4 text-center">
                        <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">
                            {complaintId ? `Available Workers ` : 'Complaint ID Not Found'}
                        </h1>
                    </div>
                    <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                        {workers.length === 0 ? (
                            <p className="text-center">No workers available for this complaint.</p>
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
