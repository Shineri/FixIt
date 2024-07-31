// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccountPage from "./pages/Authentication/CreateAccountPage";
import Login from "./pages/Authentication/Login";
import ComplainForm from "./pages/ComplainForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagerProfile from './pages/ManagerProfile';
import UserProfile from './pages/UserProfie';
import ManagerDashboard from './pages/ManagerDashboard';
import PaymentDetails from "./pages/PaymentDetails";
import Workers from "./pages/Workers";
import HomePage from "./pages/HomePage";
import EmailVerificationForm from './pages/Emailverification';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Resetpassword from './pages/Resetpassword';
import AllWorkers from "./pages/AllWorkers";



const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Navbar />
        <Routes>
          
          <Route path="/CreateAccountPage" element={<CreateAccountPage/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/ComplainForm" element={<ComplainForm/>} />
          <Route path ="/Emailverification" element={<EmailVerificationForm/>}/>
          <Route path ="/UserProfile" element={<UserProfile/>}/>
          <Route path ="/ManagerProfile" element={<ManagerProfile/>}/>
          <Route path ="/ManagerDashboard" element={<ManagerDashboard/>}/>
          <Route path ="/PaymentDetails" element={<PaymentDetails/>}/>
          <Route path ="/Workers" element={<Workers/>}/>
          <Route path ="/HomePage" element={<HomePage/>}/>
          <Route path="/Resetpassword" element={<Resetpassword/>}/>
          <Route path="/AllWorkers" element={<AllWorkers/>}/>
         
          {/* Add other routes as needed */}
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;


