import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "https://sello-backend.onrender.com/api";
// const BASE_URL = "http://localhost:3000/api";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include", // ✅ Send cookies with each request
    }),
    endpoints: (builder) => ({
        // Register User 
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
                extra: { isFormData: true }, // 👈 Flag for multipart/form-data
            }),
        }),

        // Login User
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
            }),
        }),

        // Google Login ✅ ADDED HERE
        googleLogin: builder.mutation({
            query: (token) => ({
                url: "/auth/google",
                method: "POST",
                body: { token },
            }),
        }),

        // Forgot Password
        forgotPassword: builder.mutation({
            query: (emailData) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: emailData,
            }),
        }),

        // Verify OTP
        verifyOtp: builder.mutation({
            query: (otp) => {
                const email = localStorage.getItem("email");
                return {
                    url: "/auth/verify-otp",
                    method: "POST",
                    body: { otp },
                    headers: {
                        email,
                    },
                };
            },
        }),

        // Reset Password
        resetPassword: builder.mutation({
            query: ({ password }) => {
                const email = localStorage.getItem("email");

                return {
                    url: "/auth/reset-password",
                    method: "POST",
                    body: { newPassword: password },
                    headers: {
                        email,
                        "Content-Type": "application/json",
                    },
                };
            },
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGoogleLoginMutation, // ✅ Exported
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    // useGetCurrentUserQuery, // uncomment when needed
} = api;
