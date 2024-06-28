import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Make API call to fetch user profile
                const response = await axios.get('http://localhost:3000/api/v1/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Fetch token from localStorage
                    }
                });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Error fetching user profile. Please try again.');
            }
        };

        fetchUserProfile();
    }, []);

    if (error) {
        return (
            <div className="container mx-auto flex justify-center px-6 my-12">
                <div className="w-2/3 bg-white p-5 rounded-lg border">
                    <div className="px-8 mb-4 text-center">
                        <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">User Profile</h1>
                    </div>
                    <div className="px-8 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto flex justify-center px-6 my-12">
            <div className="w-2/3 bg-white p-5 rounded-lg border">
                <div className="px-8 mb-4 text-center">
                    <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">User Profile</h1>
                </div>
                {userProfile ? (
                    <div className="px-8 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                            <p className="font-bold">Name:</p>
                            <p>{userProfile.fullName}</p>
                        </div>
                        <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                            <p className="font-bold">Email:</p>
                            <p>{userProfile.email}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="px-8 mb-4 text-center">
                    <Link to="/UserDashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        User Dashboard
                    </Link>
                    <Link to="/ComplainForm" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                        Register Complaint
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
