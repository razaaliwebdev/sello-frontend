
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

        // ✅ Car GET Endpoint
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

        // ✅ Create Car Endpoint
        createCar: builder.mutation({
            query: (formData) => {
                console.log('Preparing car creation request...');
                return {
                    url: "/cars",
                    method: "POST",
                    body: formData,
                    // Important: Don't set Content-Type header for FormData
                    // The browser will set it with the correct boundary
                    headers: {},
                    // Ensure credentials are included for authenticated requests
                    credentials: 'include',
                    // Handle file upload progress if needed
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log(`Upload progress: ${percentCompleted}%`);
                    },
                };
            },
            invalidatesTags: ['Cars'],
            // Add error handling
            transformErrorResponse: (response) => {
                console.error('Car creation failed:', response);
                return response.data;
            },
        }),
        // Car Filter Endpoint , for searching cars
        getFilteredCars: builder.query({
            query: (params) => {
                const searchParams = new URLSearchParams(params).toString();
                return {
                    url: `/cars/fitler?${searchParams}`
                }
            },
            transformResponse: (response) => response, // full object with pagination
        })
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
    useGetCarsQuery,
    useCreateCarMutation,
    useGetFilteredCarsQuery
} = api;
