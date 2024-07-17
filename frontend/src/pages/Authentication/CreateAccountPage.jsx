import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateAccountPage = () => {
  const navigate = useNavigate();

  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const roleInputRef = useRef();
  const pincodeInputRef = useRef();
  const stateInputRef = useRef();
  const cityInputRef = useRef();
  const roadNameAreaColonyInputRef = useRef();

  const [role, setRole] = useState("User");

  const submitButtonHandler = async (event) => {
    event.preventDefault();

    const fullName = fullNameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    const role = roleInputRef.current.value;
    const pincode = pincodeInputRef.current ? pincodeInputRef.current.value : "";
    const state = stateInputRef.current ? stateInputRef.current.value : "";
    const city = cityInputRef.current ? cityInputRef.current.value : "";
    const roadNameAreaColony = roadNameAreaColonyInputRef.current ? roadNameAreaColonyInputRef.current.value : "";

    if (fullName.length === 0 || fullName.length > 50) {
      alert("Enter a valid full name");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email address");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters");
    } else if (password !== confirmPassword) {
      alert("Confirmed password doesn't match");
    } else if (role === "") {
      alert("Please select a role");
    } else if (role === "Manager" && (pincode === "" || state === "" || city === "" || roadNameAreaColony === "")) {
      alert("Please fill all the required fields for the Manager role");
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/auth/signup', {
          fullName,
          email,
          password,
          role,
          pincode,
          state,
          city,
          roadName_area_colony: roadNameAreaColony
        });

        toast.success("Account created successfully!");
        navigate("/HomePage");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12 " >
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
                onChange={handleRoleChange}
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            {role === "Manager" && (
              <>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="pincode">
                    Pincode
                  </label>
                  <input
                    ref={pincodeInputRef}
                    type="text"
                    required
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="pincode"
                    placeholder="Enter pincode..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="state">
                    State
                  </label>
                  <input
                    ref={stateInputRef}
                    type="text"
                    required
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="state"
                    placeholder="Enter state..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="city">
                    City
                  </label>
                  <input
                    ref={cityInputRef}
                    type="text"
                    required
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="city"
                    placeholder="Enter city..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="roadName_area_colony">
                    Road Name/Area/Colony
                  </label>
                  <input
                    ref={roadNameAreaColonyInputRef}
                    type="text"
                    required
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="roadName_area_colony"
                    placeholder="Enter road name/area/colony..."
                  />
                </div>
              </>
            )}

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
          <div className="absolute top-3/4 right-1/4 transform -translate-y-1/2 z-0">
          <img
            src="/images/createacc_bg.jpg"
            className="w-120 h-260 opacity-100"
            alt="Decorative"
          />
          {/* <div className="absolute top-1/2 left-1/5 transform -translate-x- 1/2-translate-y-1/2 z-0">
          <img
            src="/images/createacc_bg.jpg"
            className="w-80 h-180 opacity-100"
            alt="Decorative"
            // style={{ right: '10%', top: '10%' }
          /> */}
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default CreateAccountPage;
