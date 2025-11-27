import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RightSide from "../../components/utils/RightSide";
import HeaderLogo from "../../components/utils/HeaderLogo";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiMail, FiUser, FiShield, FiClock } from "react-icons/fi";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { useGetInviteByTokenQuery, useAcceptInviteMutation } from "../../redux/services/adminApi";
import { useGetMeQuery } from "../../redux/services/api";

const AcceptInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch invite details
  const { data: inviteData, isLoading: isLoadingInvite, error: inviteError } = useGetInviteByTokenQuery(token);
  const [acceptInvite, { isLoading: isAccepting }] = useAcceptInviteMutation();

  useEffect(() => {
    if (inviteError) {
      const errorMessage = inviteError?.data?.message || "Invalid or expired invitation link.";
      toast.error(errorMessage);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [inviteError, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await acceptInvite({ token, password }).unwrap();

      // Response structure after transformResponse: { user: {...}, token: "..." }
      const userData = res.user;
      const tokenData = res.token;

      if (!userData || !tokenData) {
        throw new Error("Invalid response from server");
      }

      // STEP 1: CRITICAL - Clear email and OTP FIRST before doing anything else
      // This prevents any code that checks for email from redirecting to reset-password
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      
      // Debug: Check if email still exists
      console.log("After clearing - email exists?", !!localStorage.getItem("email"));

      // STEP 2: Store token and user data
      localStorage.setItem("token", tokenData);
      
      const completeUserData = {
        ...userData,
        adminRole: userData.adminRole || inviteData?.role,
        permissions: userData.permissions || {},
        role: "admin",
        verified: true,
        isEmailVerified: true,
        status: "active"
      };
      
      localStorage.setItem("user", JSON.stringify(completeUserData));
      
      // STEP 3: Clear email and OTP AGAIN (defensive programming)
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      
      // Debug: Verify email is cleared before redirect
      const emailStillExists = localStorage.getItem("email");
      if (emailStillExists) {
        console.error("WARNING: Email still exists in localStorage:", emailStillExists);
        localStorage.removeItem("email");
      }
      
      toast.success(`Invitation accepted! Redirecting to admin panel as ${completeUserData.adminRole || inviteData?.role}...`);
      
      // STEP 4: Redirect immediately without delay to prevent any interference
      // Using React Router navigate with replace to avoid history issues
      console.log("Redirecting to /admin/dashboard");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error("Accept invite error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to accept invitation");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoadingInvite) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={80} color="text-primary-500" />
      </div>
    );
  }

  if (inviteError || !inviteData) {
    return (
      <div className="flex h-screen flex-wrap flex-col md:flex-row">
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Invitation</h2>
            <p className="text-gray-600 mb-4">
              {inviteError?.data?.message || "This invitation link is invalid or has expired."}
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const invite = inviteData;

  return (
    <>
      {(isAccepting) && <Spinner />}
      <div className="flex h-screen flex-wrap flex-col md:flex-row">
        <div className="md:w-1/2 w-full">
          <HeaderLogo />
          <div className="md:w-[55%] mx-auto md:p-2 px-5">
            <div className="w-full text-center mb-6">
              <div className="mx-auto w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <FiMail className="text-primary-500 text-4xl" />
              </div>
              <h2 className="md:text-4xl text-2xl my-2 font-bold">Accept Invitation</h2>
              <p className="text-gray-400 pb-1">Complete your account setup</p>
            </div>

            {/* Invite Details Card */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiUser className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-semibold text-gray-900">{invite.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">{invite.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiShield className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-semibold text-gray-900">{invite.role}</p>
                  </div>
                </div>
                {invite.invitedBy && (
                  <div className="flex items-center gap-3">
                    <FiUser className="text-primary-500 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500">Invited by</p>
                      <p className="font-semibold text-gray-900">
                        {invite.invitedBy.name} ({invite.invitedBy.email})
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <FiClock className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Expires on</p>
                    <p className="font-semibold text-gray-900">{formatDate(invite.expiresAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="field border-b-[1px] border-black my-2">
                <label className="block py-2 text-lg">Create Password</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password (min. 6 characters)"
                    required
                    minLength={6}
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

              <div className="field border-b-[1px] border-black my-2">
                <label className="block py-2 text-lg">Confirm Password</label>
                <div className="relative">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-4"
                disabled={isAccepting}
              >
                {isAccepting ? "Creating Account..." : "Accept Invitation & Create Account"}
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                By accepting this invitation, you agree to join the admin panel with the role of <strong>{invite.role}</strong>.
              </p>
            </form>
          </div>
        </div>

        <div className="md:w-1/2 w-full md:block hidden">
          <RightSide
            leftPath={"/"}
            rightPath={"/login"}
            text={
              "You've been invited to join the Sello Admin Panel. Complete your account setup by creating a secure password. Once your account is created, you'll have access to the admin dashboard based on your assigned role and permissions."
            }
          />
        </div>
      </div>
    </>
  );
};

export default AcceptInvite;

