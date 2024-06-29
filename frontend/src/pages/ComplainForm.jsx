import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hero from "../Components/Hero";
import { profession } from "../Helper/Profession";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComplainForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceRequired: "",
    description: "",
    pincode: "",
    state: "",
    city: "",
    houseNoBuildingName: "",
    roadNameAreaColony: "",
    availabilitySlot: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
// Log form data before validation
console.log("Form Data before validation:", formData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.serviceRequired ||
      !formData.description ||
      !formData.pincode ||
      !formData.state ||
      !formData.city ||
      !formData.houseNoBuildingName ||
      !formData.roadNameAreaColony ||
      !formData.availabilitySlot
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
   
    try {
      const token = localStorage.getItem("token");

      console.log("Token from localStorage:", token); // Debugging line

       console.log("token :", token);
 //9bd5a38dc040a3dc488da0ccf18955dba21ab6f5
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/create-complaint",
         formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(token);
      console.log("Server response:", response.data);
      toast.success("Complaint submitted successfully!");
      navigate("/HomePage");
    } catch (error) {
      console.error("Complaint submission error:", error);
      toast.error("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <>
      <Hero />
      <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg border-2 shadow-lg">
          <ToastContainer />
          <h2 className="text-3xl font-bold text-black-500 text-center mb-6">
            Submit a Complaint
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="serviceRequired">
                Service Required
              </label>
              <select
                name="serviceRequired"
                value={formData.serviceRequired}
                onChange={handleChange}
                id="serviceRequired"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Service</option>
                {profession.map((profession) => (
                  <option key={profession.name} value={profession.name}>
                    {profession.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                id="description"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter a description..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="pincode">
                Pincode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                id="pincode"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter pincode..."
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="state">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                id="state"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter state..."
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="city">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                id="city"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter city..."
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="houseNoBuildingName">
                House No./Building Name
              </label>
              <input
                name="houseNoBuildingName"
                value={formData.houseNoBuildingName}
                onChange={handleChange}
                id="houseNoBuildingName"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter house no. or building name, separated by commas if multiple..."
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="roadNameAreaColony">
                Road Name/Area/Colony
              </label>
              <input
                name="roadNameAreaColony"
                value={formData.roadNameAreaColony}
                onChange={handleChange}
                id="roadNameAreaColony"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter road name, area, or colony, separated by commas if multiple..."
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="availabilitySlot">
                Availability Slot
              </label>
              <select
                name="availabilitySlot"
                value={formData.availabilitySlot}
                onChange={handleChange}
                id="availabilitySlot"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Availability Slot</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
              </select>
            </div>

            <div className="text-center">
              <button className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline" type="submit">
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ComplainForm;
