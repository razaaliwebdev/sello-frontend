import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthNavbar from "./components/AuthNavbar";

// Pages
import Home from "./pages/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import PasswordSuccess from "./pages/auth/PasswordSuccess";
import Me from "./pages/auth/Me";
import Entery from "./pages/Entery";

const App = () => {
  return (
    <>
      <AuthNavbar />
      <Routes>
        <Route path="/" element={<Entery />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-updated" element={<PasswordSuccess />} />
        <Route path="/home" element={<Home />} />
        <Route path="/me" element={<Me />} />
      </Routes>
    </>
  );
};

export default App;
