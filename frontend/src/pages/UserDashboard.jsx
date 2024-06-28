import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/get-my-complaint", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        setComplaints(response.data); // Assuming response.data is an array of complaints
        setLoading(false); // Update loading state once data is fetched
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setLoading(false); // Update loading state on error
        // Handle error, e.g., show error message to user
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Render loading state while fetching data
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-2/3 bg-white p-5 rounded-lg border">
          <div className="px-8 mb-4 text-center">
            <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">User Dashboard</h1>
          </div>
          <div className="px-8 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <ul className="list-decimal ml-5">
              {complaints.map((complaint) => (
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
