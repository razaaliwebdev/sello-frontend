
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "https://sello-backend.onrender.com/api";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),
        googleLogin: builder.mutation({
            query: (token) => ({
                url: "/auth/google",
                method: "POST",
                body: { token },
            }),
            invalidatesTags: ["User"],
        }),
        forgotPassword: builder.mutation({
            query: (emailData) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: emailData,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (otp) => {
                const email = localStorage.getItem("email");
                return {
                    url: "/auth/verify-otp",
                    method: "POST",
                    body: { otp },
                    headers: { email },
                };
            },
        }),
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
        getMe: builder.query({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),

        // ✅ Corrected Car GET Endpoint
        getCars: builder.query({
            query: () => ({
                url: "/cars",
                method: "GET",
            }),
            transformResponse: (response) => {
                // Extract the cars array from the response
                return response?.cars || [];
            },
        }),
    }),
});

// ✅ Export hooks
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGoogleLoginMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    useGetMeQuery,
    useLogoutMutation,
    useGetCarsQuery, // <-- ADD THIS
} = api;

