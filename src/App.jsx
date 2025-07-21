import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Components
import Spinner from "./components/Spinner.jsx";

// Pages
import Entery from "./pages/Entery.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/SignUp.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import VerifyOtp from "./pages/auth/VerifyOtp.jsx";
import ResetSuccess from "./pages/auth/ResetSuccess.jsx";
import OurPrivacyPolicy from "./pages/legal/OurPrivacyPolicy.jsx";
import TermsCondition from "./pages/legal/TermsCondition.jsx";

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const location = useLocation();

  // Initial app load
  useEffect(() => {
    const handleLoad = () => setInitialLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Page transition loading (fake delay to simulate)
  useEffect(() => {
    setPageLoading(true);
    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, 300); // Adjust this to simulate API or data loading time
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (initialLoading || pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={80} color="text-purple-500" thickness={5} speed="fast" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Entery />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/privacy-policy" element={<OurPrivacyPolicy />} />
        <Route path="/terms-conditon" element={<TermsCondition />} />
      </Routes>
    </>
  );
};

export default App;
