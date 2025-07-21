import React, { useState } from "react";
import RightSide from "../../components/utils/RightSide";
import HeaderLogo from "../../components/utils/HeaderLogo";
import { BsTelephoneXFill } from "react-icons/bs";
import { useForgotPasswordMutation } from "../../redux/services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      return toast.error("Email is required");
    }

    try {
      const response = await forgotPassword({ email }).unwrap();
      console.log("API Response:", response); // ✅ Check what backend returns

      toast.success("OTP sent successfully");

      // Store email in localStorage
      localStorage.setItem("email", email);

      // Optionally check for a success field (if your backend includes it)
      // if (response.success) {
      setSuccess(true);
      console.log("Before navigate");
      navigate("/verify-otp");
      console.log("After navigate");
      // }
    } catch (err) {
      console.error("API Error:", err); // ✅ Debug error
      setError(err?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="flex h-screen flex-wrap flex-col md:flex-row relative">
      {isLoading && <Spinner />}

      <div className="md:w-1/2 w-[90%]">
        <HeaderLogo />
        <div className="flex items-center flex-col justify-center">
          <div className="phoneIcon bg-white shadow-xl h-32 w-32 rounded-full flex items-center justify-center shadow-gray-500 text-4xl md:text-7xl text-primary-500">
            <BsTelephoneXFill />
          </div>
          <h2 className="md:text-4xl mt-5 font-semibold mb-3">
            Forgot Password?
          </h2>
          <p className="text-gray-400 md:text-lg text-center md:text-left">
            Do not worry! We will help you recover your password.
          </p>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              OTP has been sent to your email successfully!
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form className="md:w-[55%] w-[90%]" onSubmit={handleSubmit}>
            <div className="field border-b-[1px] border-black my-2">
              <label className="block py-2 text-lg">Email</label>
              <input
                className="w-full py-2 border-none outline-none px-0 text-lg"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-4"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
            <div className="text-center my-3 text-lg text-gray-400">
              Back to{" "}
              <Link className="text-primary-500 hover:underline" to="/login">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="md:w-1/2 w-full md:block hidden">
        <RightSide leftPath={"/login"} rightPath={"/verify-otp"} />
      </div>
    </div>
  );
};

export default ForgotPassword;
