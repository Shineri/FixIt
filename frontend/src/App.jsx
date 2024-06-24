// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccountPage from "./pages/Authentication/CreateAccountPage";
import Login from "./pages/Authentication/Login";
import ComplainForm from "./pages/ComplainForm";
import PaymentForm from "./pages/PaymentForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagerProfile from './pages/ManagerProfile';
import UserProfile from './pages/UserProfie';



const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/CreateAccountPage" element={<CreateAccountPage/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/ComplainForm" element={<ComplainForm/>} />
          <Route path="/PaymentForm" element={<PaymentForm/>} />
          <Route path ="/UserProfile" element={<UserProfile/>}/>
          <Route path ="/ManagerProfile" element={<ManagerProfile/>}/>
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


