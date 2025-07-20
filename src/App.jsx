import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Navbar from "./components/Navbar";
import Entery from "./pages/Entery";
import AuthNavbar from "./components/AuthNavbar";
import ResetPassword from "./pages/auth/ResetPassword";
import PasswordSuccess from "./pages/auth/PasswordSuccess";
import Me from "./pages/auth/Me";
import { Toaster } from "react-hot-toast";
import { useGetCurrentUserQuery } from "./redux/services/api";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  const { data: user, error, isLoading } = useGetCurrentUserQuery();

  const isAuthenticated = !isLoading && !error && user;

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Switch navbar based on auth */}
      {isAuthenticated ? <Navbar /> : <AuthNavbar />}

      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Entery />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-updated" element={<PasswordSuccess />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoutes>
              <Me />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;