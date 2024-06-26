import React, { useState } from "react";

const EmailVerificationForm = () => {
  const [email, setEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Send verification to:", email);
    setVerificationSent(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot password
        </h2>
        {!verificationSent ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Send Verification Email
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-gray-800 mb-4">
              Verification email sent to {email}.
            </p>
            <p className="text-sm text-red-500">
              Check your inbox (and spam folder) for the verification email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationForm;
