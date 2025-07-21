import React, { useState } from "react";
import RightSide from "../../components/utils/RightSide";
import HeaderLogo from "../../components/utils/HeaderLogo";
import { images } from "../../assets/assets";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import {
  useRegisterUserMutation,
  useGoogleLoginMutation,
} from "../../redux/services/api";
import Spinner from "../../components/Spinner";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // ✅
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registerUser] = useRegisterUserMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !avatar) {
      return toast.error("All fields and avatar are required");
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", "buyer");
    formData.append("avatar", avatar);

    try {
      setLoading(true);
      const res = await registerUser(formData).unwrap();
      toast.success(res.message || "Registered successfully!");
      setData({ name: "", email: "", password: "" });
      setAvatar(null);
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setGoogleLoading(true); // ✅ Start spinner
      const token = credentialResponse.credential;
      const res = await googleLogin(token).unwrap();
      toast.success("Google sign-up successful!");
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || "Google login failed");
    } finally {
      setGoogleLoading(false); // ✅ Stop spinner
    }
  };

  return (
    <>
      {(loading || googleLoading) && <Spinner />} {/* ✅ Spinner overlay */}
      <div className="flex h-screen flex-wrap flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 w-full md:flex-row flex-col flex">
          <div className="h-20">
            <HeaderLogo />
          </div>
          <div className="md:w-[65%] h-full md:mt-12 mt-0 md:p-2 px-5">
            <div className="w-full">
              <img
                className="mx-auto w-14"
                src={images.userIcon}
                alt="userIcon"
              />
            </div>
            <div>
              <h2 className="md:text-3xl text-2xl my-1 md:my-2">
                Create an Account as a User
              </h2>
              <p className="text-gray-400">Please enter your details.</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full"
              encType="multipart/form-data"
            >
              {/* Name */}
              <div className="field my-1 md:my-2 border-b-[1px] border-black">
                <label className="block py-1 text-lg">Name</label>
                <input
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full py-2 border-none outline-none px-0 text-lg"
                  type="text"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email */}
              <div className="field my-1 md:my-2 border-b-[1px] border-black">
                <label className="block py-2 text-lg">Email</label>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full py-2 border-none outline-none px-0 text-lg"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="field my-1 md:my-2 border-b-[1px] border-black">
                <label className="block py-2 text-lg">Password</label>
                <div className="relative">
                  <input
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              {/* Avatar */}
              <div className="field my-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="text-sm"
                  required
                />
              </div>

              {/* Terms */}
              <div className="my-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-full border-2 bg-primary-500 border-primary-500"
                  />
                  <span className="text-sm">
                    I accept the{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-primary-500 font-medium"
                    >
                      Privacy Services
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/terms-conditon"
                      className="text-primary-500 font-medium"
                    >
                      Terms
                    </Link>
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-1 flex items-center justify-center"
              >
                {loading ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                ) : (
                  "Sign Up"
                )}
              </button>

              {/* Google Sign Up */}
              <div className="my-3 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google login failed")}
                />
              </div>

              {/* Login link */}
              <p className="text-center text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-primary-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="md:w-1/2 w-full md:block hidden">
          <RightSide leftPath="/login" rightPath="/home" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
