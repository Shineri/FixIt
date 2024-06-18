import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidateEmail} from "../../Helper/EmailHelper";

const Login = () => {
  const navigate = useNavigate();
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const roleInputRef = useRef();
  
  const [role, setRole] = useState("User"); // Default role is User

  const handleSignUp = () => {
    const fullName = fullNameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!fullName) {
      alert("Please enter your full name");
      return;
    }
    if (!ValidateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (!ValidatePassword(password)) {
      alert("Password does not meet the strength requirements");
      return;
    }

    // Simulate a successful sign up and navigate to login page
    alert("Sign up successful");
    navigate("/login");
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 mt-12">
        <div className="bg-white p-5 rounded-lg border-2 text-center">
          <h2 className="text-3xl font-bold text-red-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Sign Up
          </h2>

          <form className="px-6 pt-4 pb-4 bg-white rounded">
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-bold text-gray-700"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                ref={fullNameInputRef}
                placeholder="Enter Full Name..."
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                ref={emailInputRef}
                placeholder="Enter Email Address..."
              />
            </div>

            <div className="mb-6">
              <label
                className="block mb-1 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                ref={passwordInputRef}
                placeholder="Enter Password..."
              />
            </div>

            <div className="mb-6">
              <label
                className="block mb-1 text-sm font-bold text-gray-700"
                htmlFor="role"
              >
                Role
              </label>
              <select
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                ref={roleInputRef}
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </form>

          <hr className="mb-2 border-t" />

          <div className="text-center">
            Already have an account?
            <Link
              className="ml-1 p-2 inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 px-2 py-2 font-semibold bg-white shadow-sm"
              to="/login"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
