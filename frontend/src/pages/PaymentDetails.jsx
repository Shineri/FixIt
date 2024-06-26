import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
    const navigate = useNavigate();

    const bankNameInputRef = useRef();
    const accountNumberInputRef = useRef();
    const ifscInputRef = useRef();
    const accountHolderNameInputRef = useRef();
    const upiInputRef = useRef();

    const submitButtonHandler = (event) => {
        event.preventDefault();

        const bankName = bankNameInputRef.current.value;
        const accountNumber = accountNumberInputRef.current.value;
        const ifsc = ifscInputRef.current.value;
        const accountHolderName = accountHolderNameInputRef.current.value;
        const upi = upiInputRef.current.value;

        // Validation logic
        if (bankName.length === 0 || bankName.length > 100) {
            alert("Enter a valid bank name");
        } else if (accountNumber.length === 0 || accountNumber.length > 20) {
            alert("Enter a valid account number");
        } else if (ifsc.length !== 11) {
            alert("Enter a valid IFSC code");
        } else if (accountHolderName.length === 0 || accountHolderName.length > 50) {
            alert("Enter a valid account holder name");
        } else {
            // Simulate success response
            toast.success("Payment details saved successfully!");
            navigate("/dashboard"); // Redirect to dashboard or another relevant page
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-2/3 bg-white p-5 rounded-lg border">
                    <div className="px-8 mb-4 text-center">
                        <h1 className="pt-4 mb-2 text-2xl font-bold underline text-black-600">Enter Payment Details</h1>
                    </div>
                    <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="bankName">
                                Bank Name
                            </label>
                            <input
                                ref={bankNameInputRef}
                                type="text"
                                required
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="bankName"
                                placeholder="Enter your bank name..."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="accountNumber">
                                Account Number
                            </label>
                            <input
                                ref={accountNumberInputRef}
                                type="text"
                                required
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="accountNumber"
                                placeholder="Enter your account number..."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="ifsc">
                                IFSC Code
                            </label>
                            <input
                                ref={ifscInputRef}
                                type="text"
                                required
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="ifsc"
                                placeholder="Enter IFSC code..."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="accountHolderName">
                                Account Holder Name
                            </label>
                            <input
                                ref={accountHolderNameInputRef}
                                type="text"
                                required
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="accountHolderName"
                                placeholder="Enter account holder name..."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="upi">
                                UPI (Optional)
                            </label>
                            <input
                                ref={upiInputRef}
                                type="text"
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="upi"
                                placeholder="Enter UPI ID..."
                            />
                        </div>

                        <div className="mb-6 text-center">
                            <button
                                onClick={submitButtonHandler}
                                className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Save Payment Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
