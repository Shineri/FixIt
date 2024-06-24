import React from "react";
import { Link } from "react-router-dom";

const ComplainBox = (props) => {
  // Mock data - replace with actual props or static data as needed
  const item = {
    _id: "1",
    img: "https://via.placeholder.com/150", // Replace with actual image URL
    title: "Example Complain Title",
    profession: "Plumber",
    creationTime: "2024-06-18T08:30:00Z", // ISO date format
    creatorUsername: "example_user",
    status: "Resolved",
  };

  // Date formatting (mock)
  const locatDate = new Date(item.creationTime);
  const day = locatDate.getDate();
  const year = locatDate.getFullYear();
  const months = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const month = months[locatDate.getMonth()];
  const date = day + " " + month + " " + year;

  return (
    <section className="text-gray-600 body-font">
      <div className="p-5 bg-white flex items-center mx-2 my-2 border-b border-gray-200 rounded-lg sm:flex-row flex-col">
        <div className="sm:w-32 sm:h-32 h-20 w-20 rounded-full sm:mr-10 flex items-center gap-x-6 justify-center">
          {/* Replace with actual image URL */}
          <img
            src={item.img}
            className="rounded-full h-3/4 w-3/4"
            alt="User Avatar"
          />
        </div>
        <div className="flex-grow sm:text-left text-center sm:mt-0">
          <Link to={`/complain/${item._id}`}>
            <span className="text-black text-2xl title-font font-bold mb-0 hover:text-red-500">
              {item.title}
            </span>
          </Link>
          <p className="leading-relaxed mt-0 p-0 text-base">
            Profession: {item.profession}
          </p>
          <p className="leading-relaxed mt-5 p-0 text-base">Date: {date}</p>
          <p className="leading-relaxed mt-0 p-0 text-base">
            By -{" "}
            <span>
              <Link
                className="hover:text-red-500"
                to={`/user/${item.creatorUsername}`}
              >
                {item.creatorUsername}
              </Link>
            </span>
          </p>
        </div>
        <div className="flex flex-col">
          {item.status}
          <br />
          <Link
            to={`/complain/${item._id}`}
            className="text-green-500 bg-gray-200 text-center rounded-xl"
          >
            Open
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComplainBox;
