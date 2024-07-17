import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidateEmail } from "../../Helper/EmailHelper";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleLogin = async () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!ValidateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });

      const { token, role } = response.data;
      
      localStorage.setItem("token", token);

      if (role === 'Manager') {
        navigate("/PaymentDetails");
      } else {
        navigate("/UserProfile");
      }

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[url('/images/loginbg.jpg')] bg-cover bg-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg border-2 shadow-lg">
        <ToastContainer /> {/* ToastContainer for displaying notifications */}
        <h2 className="text-3xl font-bold text-black-500 text-center mb-6">Login</h2>

        <form className="px-6 pt-4 pb-4 bg-transparent rounded">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email">
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
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="password">
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
              className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>

        <div className="mb-4 text-center">
          <Link
            className="text-blue-500 hover:text-blue-800"
            to="/Emailverification"
          >
            Forgot Password?
          </Link>
        </div>

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
