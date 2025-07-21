import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

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

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setInitialLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (initialLoading) {
    return (
      <Spinner size={80} color="text-purple-500" thickness={5} speed="fast" />
    );
  }

  return (
    <div>
      {/* <Spinner /> */}
      <Routes>
        <Route path="/" element={<Entery />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-sucess" element={<ResetSuccess />} />
      </Routes>
    </div>
  );
};

export default App;
