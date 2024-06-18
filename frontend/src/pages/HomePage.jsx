import React, { useEffect, useRef, useState } from "react";
import ComplainBoxes from "../Components/ComplainBoxes";
import Hero from "../Components/Hero";
import { profession } from "../Helper/Profession";

const HomePage = () => {
  const [complainsData, setComplainsData] = useState([]);
  const professionInputRef = useRef();
  const statusInputRef = useRef();
  const userNameInputRef = useRef();

  useEffect(() => {
    // Simulate initial data fetch
    simulateFetchLatestComplains();
  }, []);

  console.log("Home page entered.");

  // Simulate fetching latest complains
  const simulateFetchLatestComplains = () => {
    console.log("Simulating fetch latest complains...");

    // Mock data structure similar to your backend response
    const mockData = [
      { id: 1, title: "Complain 1", status: "Not Assigned", profession: "Plumber" },
      { id: 2, title: "Complain 2", status: "Assigned", profession: "Electrician" },
      { id: 3, title: "Complain 3", status: "Resolved", profession: "Carpenter" },
      // Add more mock data as needed
    ];

    // Simulate delay for async behavior (like network request)
    setTimeout(() => {
      setComplainsData(mockData);
    }, 1000); // Simulate 1 second delay
  };

  // Handle filter button click
  const filterButtonHandler = () => {
    let professionValue = professionInputRef.current.value;
    let statusValue = statusInputRef.current.value;

    // Filter logic
    let filteredData = complainsData.filter(complain => {
      if (professionValue !== "Any" && professionValue !== complain.profession) {
        return false;
      }
      if (statusValue !== "Any" && statusValue !== complain.status) {
        return false;
      }
      return true;
    });

    setComplainsData(filteredData);
  };

  // Handle search button click by username
  const usernameButtonHandler = () => {
    let username = userNameInputRef.current.value.trim().toLowerCase();

    if (!username) {
      alert("Enter a username");
      return;
    }

    // Filter by username (in this mock, assuming username is part of complain data)
    let filteredData = complainsData.filter(complain => {
      return complain.title.toLowerCase().includes(username); // Change to appropriate field
    });

    setComplainsData(filteredData);
  };

  return (
    <>
      <div className="bg-gray-200 h-full">
        <Hero />
        <div className="flex flex-row justify-between mx-20">
          <div className="flex">
            <div className="ml-2 rounded-xl">
              <select ref={professionInputRef} className="rounded-lg px-1">
                {profession.map((data) => (
                  <option value={data.name} key={data.name}>
                    {data.name}
                  </option>
                ))}
                <option value="Any">Any</option>
              </select>
            </div>
            <div className="mx-2">
              <select ref={statusInputRef} className="rounded-lg px-1">
                <option value="Not Assigned">Not Assigned</option>
                <option value="Assigned">Assigned</option>
                <option value="Resolved">Resolved</option>
                <option value="Any">Any</option>
              </select>
              <button
                className="mx-2 rounded-lg bg-red-500 px-2 border-red-950 border-2 hover:scale-110 text-white text-sm p-[1px]"
                onClick={filterButtonHandler}
              >
                Find
              </button>
            </div>
          </div>

          <div className="mb-4">
            <input
              className="px-3 py-2 mx-2 text-sm leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
              id="text"
              type="text"
              ref={userNameInputRef}
              placeholder="Enter full username"
            />
            <button
              className="mx-2 rounded-lg bg-red-500 px-2 border-red-950 border-2 hover:scale-110 text-white p-[3px] px-4"
              onClick={usernameButtonHandler}
            >
              Search
            </button>
          </div>
        </div>

        <ComplainBoxes complains={complainsData} />
      </div>
    </>
  );
};

export default HomePage;
