import React from "react";
import { Link } from "react-router-dom";

const UserProfile = ({ userName, role, email}) => {
  const handleComplainForm = () => {
    // Navigate to complain form page
    // Replace '/complain-form' with your actual route
    window.location.href = "/ComplainForm";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white-400 to-indigo-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-red-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb=8">
          My Profile
        </h2>
        <div className="mb-4">
          <p className="text-lg text-gray-700 mb =6" >
            <span className="font-semibold">Name:</span> {userName}
          </p>
          <p className="text-lg text-gray-700 mb =6">
            <span className="font-semibold">Role:</span> {role}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Email:</span> {email}
          </p>
          </div>
          <div className="mt-6" text-centre>
          <button
            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
            onClick={handleComplainForm}
          >
          Register Complain
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
