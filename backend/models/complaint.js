import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ComplainForm = () => {
  const navigate = useNavigate();

  const serviceRequiredRef = useRef();
  const descriptionRef = useRef();
  const pincodeRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const houseNoBuildingNameRef = useRef();
  const roadNameAreaColonyRef = useRef();
  const availabilitySlotRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const serviceRequired = serviceRequiredRef.current.value;
    const description = descriptionRef.current.value;
    const pincode = pincodeRef.current.value;
    const state = stateRef.current.value;
    const city = cityRef.current.value;
    const houseNoBuildingName = houseNoBuildingNameRef.current.value;
    const roadNameAreaColony = roadNameAreaColonyRef.current.value;
    const availabilitySlot = availabilitySlotRef.current.value;

    const complaintData = {
      serviceRequired,
      description,
      pincode,
      state,
      city,
      houseNoBuildingName: houseNoBuildingName.split(','),
      roadNameAreaColony: roadNameAreaColony.split(','),
      availabilitySlot,
      status: "Pending",
      paymentStatus: "Pending",
      amount: 0
    };

    console.log(complaintData);

    // Simulate submission to backend
    // await axios.post('/api/complaints', complaintData);

    alert("Complaint submitted successfully!");
    navigate("/complaints");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg border-2 shadow-lg">
        <h2 className="text-3xl font-bold text-red-500 text-center mb-6">Submit a Complaint</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="serviceRequired">Service Required</label>
            <select ref={serviceRequiredRef} id="serviceRequired" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" required>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="description">Description</label>
            <textarea ref={descriptionRef} id="description" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter a description..." required></textarea>
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="pincode">Pincode</label>
            <input ref={pincodeRef} id="pincode" type="text" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter pincode..." required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="state">State</label>
            <input ref={stateRef} id="state" type="text" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter state..." required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="city">City</label>
            <input ref={cityRef} id="city" type="text" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter city..." required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="houseNoBuildingName">House No./Building Name</label>
            <input ref={houseNoBuildingNameRef} id="houseNoBuildingName" type="text" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter house no. or building name, separated by commas if multiple..." required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="roadNameAreaColony">Road Name/Area/Colony</label>
            <input ref={roadNameAreaColonyRef} id="roadNameAreaColony" type="text" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter road name, area, or colony, separated by commas if multiple..." required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="availabilitySlot">Availability Slot</label>
            <select ref={availabilitySlotRef} id="availabilitySlot" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" required>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
            </select>
          </div>

          <div className="text-center">
            <button className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline" type="submit">
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplainForm;
