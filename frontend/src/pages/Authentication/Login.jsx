import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidateEmail } from "../../Helper/EmailHelper";

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleLogin = () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!ValidateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }

    // Simulate a successful login and navigate to a dashboard or home page
    alert("Login successful");
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg border-2 shadow-lg">
        <h2 className="text-3xl font-bold text-red-500 text-center mb-6">
          Login
        </h2>

        <form className="px-6 pt-4 pb-4 bg-white rounded">
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

          <div className="mb-6 text-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>

        <hr className="mb-4 border-t" />

        <div className="text-center">
          Don't have an account?
          <Link
            className="ml-1 inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 px-2 py-2 font-semibold"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
