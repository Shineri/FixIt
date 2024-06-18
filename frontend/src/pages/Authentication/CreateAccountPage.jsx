

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateAccountPage = () => {
  const navigate = useNavigate();

  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const roleInputRef = useRef();

  const submitButtonHandler = (event) => {
    event.preventDefault();

    const fullName = fullNameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    const role = roleInputRef.current.value;

    if (fullName.length === 0 || fullName.length > 50) {
      alert("Enter a valid full name");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email address");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters");
    } else if (password !== confirmPassword) {
      alert("Confirmed password doesn't match");
    } else if (!role) {
      alert("Please select a role");
    } else {
      toast.success("Account created successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-1/2 bg-white p-5 rounded-lg border">
          <div className="px-8 mb-4 text-center">
            <img
              src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png"
              className="h-10 w-10 inline-block rounded-full border"
              alt="user icon"
            />
          </div>

          <div className="px-8 mb-4 text-center">
            <h2 className="pt-4 mb-2 text-2xl">Create Account</h2>
          </div>
          
          <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="fullName">
                Full Name
              </label>
              <input
                ref={fullNameInputRef}
                type="text"
                required
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="fullName"
                placeholder="Enter your full name..."
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                ref={emailInputRef}
                type="email"
                required
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="Enter your email..."
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                ref={passwordInputRef}
                type="password"
                required
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                placeholder="Enter password..."
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                ref={confirmPasswordInputRef}
                type="password"
                required
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                placeholder="Confirm password..."
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="role">
                Role
              </label>
              <select
                ref={roleInputRef}
                required
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="role"
              >
                <option value="" disabled selected>
                  Select your role
                </option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="mb-6 text-center">
              <button
                onClick={submitButtonHandler}
                className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
