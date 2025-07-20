import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "https://sello-backend.onrender.com/api";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: BASE_URL,
            credentials: "include", // ✅ Send cookies with each request
        }
    ),
    endpoints: (builder) => ({
        // Register User 
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData
            })
        }),

        // Login User
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData
            })
        }),

        // Get Currect Logged-In User
        getCurrentUser: builder.query({
            query: () => ({
                url: "/auth/me",  // your backend should expose this
                method: "GET",
            }),
        }),

        // Forgot Password
        forgotPassword: builder.mutation({
            query: (emailData) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: emailData
            })
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
                        email
                    },
                };
            },
        }),

        // Update the password
        resetPassword: builder.mutation({
            query: ({ password }) => {
                const email = localStorage.getItem("email");

                return {
                    url: "/auth/reset-password",
                    method: "POST",
                    body: { newPassword: password }, // ✅ MATCH BACKEND KEY
                    headers: {
                        email,
                        "Content-Type": "application/json",
                    },
                };
            },
        }),


    })
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetCurrentUserQuery, useForgotPasswordMutation, useVerifyOtpMutation, useResetPasswordMutation } = api;
