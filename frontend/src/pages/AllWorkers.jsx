import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [fullName, setFullName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [services, setServices] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const[status,setStatus]=useState('');

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const token = localStorage.getItem('token'); // Ensure the token is stored in local storage
                const response = await axios.get('http://localhost:3000/api/v2/manager/get-all-worker', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setWorkers(response.data.workers);
            } catch (error) {
                console.error('Error fetching workers:', error.message);
                toast.error('Error fetching workers');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    const handleAddWorker = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/api/v2/manager/add-worker', {
                fullName,
                phoneNo,
                services: services.split(',').map(service => service.trim()), // Convert comma-separated string to array
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setWorkers([...workers, response.data.worker]);
            setFullName('');
            setPhoneNo('');
            setServices('');
            setStatus('');
            setShowForm(false);
            toast.success('Worker added successfully');
        } catch (error) {
            console.error('Error adding worker:', error.message);
            toast.error('Error adding worker');
        }
    };

    const handleDeleteWorker = async (workerId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/v2/manager/delete-worker/${workerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setWorkers(workers.filter(worker => worker._id !== workerId));
            toast.success('Worker deleted successfully');
        } catch (error) {
            console.error('Error deleting worker:', error.message);
            toast.error('Error deleting worker');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        // <div className="h-screen w-screen flex justify-center items-center bg-[url('/images/workers.jpg')] bg-cover bg-center">
         <div className="  container mx-auto   bg-[url('/images/workers.jpg')]">
            <ToastContainer />
            <div className="flex justify-center px-6 my-12">
                <div className="w-2/3 bg-transparent p-5 rounded-lg border p-5 rounded-lg border">
                    <div className="px-8 mb-4 text-center">
                        <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">All Workers</h1>
                    </div>
                    <div className="flex justify-between items-center mb-4 px-8">
                        <h2 className="text-lg font-bold">List of Workers</h2>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Cancel' : 'Add Worker'}
                        </button>
                    </div>
                    {showForm && (
                        <form onSubmit={handleAddWorker} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    placeholder="Enter worker's full name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phoneNo">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="phoneNo"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    placeholder="Enter worker's phone number"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="services">
                                    Services (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    id="services"
                                    value={services}
                                    onChange={(e) => setServices(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    placeholder="Enter services provided, separated by commas"
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="status">
                                    Status
                                </label>
                                <input
                                    type="text"
                                    id="status"
                                    value={status}
                                    onChange={(e) => setServices(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    placeholder="Enter either worker is assigned or"
                                />
                            </div> */}
                            <div className="mb-6 text-center">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                >
                                    Add Worker
                                </button>
                            </div>
                        </form>
                    )}
                    <div className="px-8 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                        {workers.length > 0 ? (
                            <ul className="list-decimal ml-5">
                                {workers.map(worker => (
                                    <li key={worker._id} className="mb-4 text-black">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-bold">{worker.fullName}</h3>
                                                <p className="text-gray-600">Phone: {worker.phoneNo}</p>
                                                <p className="text-gray-600">Services: {worker.services.join(', ')}</p>
                                                <p className="text-red-600">Status:{worker.status}</p>
                                            </div>
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                                onClick={() => handleDeleteWorker(worker._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>No workers found! Add workers to see them listed here.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllWorkers;
