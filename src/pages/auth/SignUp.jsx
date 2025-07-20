import React, { useState } from "react";
import { images } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import RightSide from "../../components/utils/RightSide";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useRegisterUserMutation } from "../../redux/services/api"; // ✅ RTK Mutation
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e, role = "buyer") => {
    e.preventDefault();
    const { name, email, password, avatar } = formData;

    if (!name || !email || !password || !avatar) {
      toast.error("All fields including avatar are required.");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("avatar", avatar);
    data.append("role", role);

    try {
      await registerUser(data).unwrap();
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to register.");
    }
  };

  return (
    <div className="h-[88vh] flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0">
        <div className="w-full md:w-[70%] max-w-md">
          <div className="flex justify-center">
            <img src={images.userIcon} className="h-10 w-10" alt="" />
          </div>
          <h1 className="text-center font-medium text-2xl md:text-3xl mb-1">
            Create an Account
          </h1>
          <p className="text-center font-[200] text-[#D6D6D6]">
            Please enter the details.
          </p>

          <form className="space-y-2.5">
            <div className="flex flex-col gap-1 border-b border-black p-1.5">
              <label className="text-gray-700 font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
                className="text-md font-[200] outline-none bg-transparent placeholder-black"
              />
            </div>

            <div className="flex flex-col gap-1 border-b border-black p-1.5">
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="text-md font-[200] outline-none bg-transparent placeholder-black"
              />
            </div>

            <div className="flex flex-col gap-1 border-b border-black p-1.5">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className="text-md font-[200] outline-none bg-transparent placeholder-black"
              />
            </div>

            <div className="flex flex-col gap-1 p-1.5">
              <label className="text-gray-700 font-medium">Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.files[0] })
                }
                className="text-md font-[200] bg-white rounded"
              />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                required
                className="accent-primary-500 w-4 h-4"
              />
              <span className="text-sm text-gray-700 font-light">
                I accept the{" "}
                <span className="text-blue-500">Privacy Policy</span> and{" "}
                <span className="text-blue-500">Terms</span>.
              </span>
            </div>

            <button
              disabled={isLoading}
              onClick={(e) => handleSubmit(e, "buyer")}
              className="bg-primary-500 shadow-lg shadow-gray-400 w-full mt-2 p-3 text-lg font-semibold hover:opacity-95"
            >
              {isLoading ? "Signing Up..." : "Sign Up as User"}
            </button>

            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const token = credentialResponse.credential;
                const res = await axios.post(
                  "https://sello-backend.onrender.com/api/auth/google",
                  { token }
                );
                localStorage.setItem("token", res.data.token);
                window.location.href = "/home";
              }}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />

            <div className="text-center text-lg">
              <span className="text-[#D6D6D6]">Already have an account? </span>
              <Link
                to="/login"
                className="text-primary-500 hover:text-primary-400"
              >
                Sign in
              </Link>
            </div>
            <button
              type="button"
              disabled={isLoading}
              onClick={(e) => handleSubmit(e, "seller")}
              className="bg-primary-500  shadow-gray-400 w-full shadow-lg p-3 text-lg font-semibold hover:opacity-95"
            >
              {isLoading ? "Signing Up..." : "Sign Up as Dealer"}
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 h-full hidden md:block">
        <RightSide path="home" />
      </div>
    </div>
  );
};

export default SignUp;
