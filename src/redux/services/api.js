
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const BASE_URL = import.meta.env.VITE_API_URL || "https://sello-backend.onrender.com/api";

export const api = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        const baseResult = await fetchBaseQuery({
            baseUrl: BASE_URL,
            credentials: "include",
            prepareHeaders: (headers) => {
                const token = localStorage.getItem("token");
                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
                return headers;
            },
        })(args, api, extraOptions);

        // Handle 401 errors - token expired or invalid
        if (baseResult.error && baseResult.error.status === 401) {
            // Clear invalid token
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // Don't redirect automatically - let components handle it
        }

        return baseResult;
    },
    tagTypes: ["User", "SupportChat", "CarChat"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"],
            transformResponse: (response) => {
                // Backend format: { success, message, data: { user, token } }
                if (response?.data) {
                    return {
                        message: response.message,
                        user: response.data.user,
                        token: response.data.token
                    };
                }
                return response;
            },
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"],
            transformResponse: (response) => {
                // Backend format: { success, message, data: { user, token } }
                if (response?.data?.user && response?.data?.token) {
                    return {
                        token: response.data.token,
                        user: response.data.user
                    };
                }
                // Fallback for old format
                if (response?.token && response?.user) {
                    return {
                        token: response.token,
                        user: response.user
                    };
                }
                return response;
            },
        }),
        googleLogin: builder.mutation({
            query: (token) => {
                if (!token || typeof token !== 'string') {
                    throw new Error('Invalid Google token provided');
                }
                return {
                    url: "/auth/google",
                    method: "POST",
                    body: { token: token },
                };
            },
            invalidatesTags: ["User"],
            transformResponse: (response) => {
                // Backend format: { success, message, data: { user, token } }
                if (response?.data?.user && response?.data?.token) {
                    return {
                        token: response.data.token,
                        user: response.data.user
                    };
                }
                // Fallback for old format
                if (response?.token && response?.user) {
                    return {
                        token: response.token,
                        user: response.user
                    };
                }
                return response;
            },
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
            transformResponse: (response) => {
                return response?.data || response;
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
            transformResponse: (response) => {
                return response?.data || response;
            },
        }),
        getMe: builder.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["User"],
            transformResponse: (response) => {
                return response?.data || response;
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),


        // ✅ Car GET Endpoint with Pagination
        getCars: builder.query({
            query: ({ page = 1, limit = 12, condition } = {}) => {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                });

                // Only add condition if it's explicitly 'new' or 'used' (not empty string or undefined)
                if (condition && (condition === 'new' || condition === 'used')) {
                    params.append('condition', condition);
                }

                return {
                    url: `/cars?${params.toString()}`,
                    method: "GET",
                };
            },
            transformResponse: (response) => {
                const data = response?.data || response;
                return {
                    cars: data?.cars || [],
                    total: data?.total || 0,
                    page: data?.page || 1,
                    pages: data?.pages || 1
                };
            },
        }),

        // ✅ Get Single Car Endpoint
        getSingleCar: builder.query({
            query: (carId) => ({
                url: `/cars/${carId}`,
                method: "GET",
            }),
            transformResponse: (response) => {
                const data = response?.data || response;
                return data;
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
        // In your api.js file, fix the typo:
        getFilteredCars: builder.query({
            query: (params) => {
                const searchParams = new URLSearchParams(params).toString();
                return {
                    url: `/cars/filter?${searchParams}` // Changed from "fitler" to "filter"
                }
            },
            transformResponse: (response) => response,
        }),
        // Get My Cars or My listings
        getMyCars: builder.query({
            query: () => ({
                url: "/cars/my/listings",   // 👈 matches backend route
                method: "GET",
            }),
            transformResponse: (response) => {
                const data = response?.data || response;
                return {
                    cars: data?.cars || [],
                    total: data?.total || 0,
                };
            },
            providesTags: ["Cars"],
        }),

        // Support Chat Endpoints
        createSupportChat: builder.mutation({
            query: (data) => ({
                url: "/support-chat",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["SupportChat"],
        }),
        getUserSupportChats: builder.query({
            query: () => "/support-chat/my-chats",
            providesTags: ["SupportChat"],
            transformResponse: (response) => response?.data || response,
        }),
        getSupportChatMessages: builder.query({
            query: (chatId) => `/support-chat/${chatId}/messages`,
            providesTags: ["SupportChat"],
            transformResponse: (response) => {
                // Handle response format: { success, message, data: [...] }
                if (response?.data && Array.isArray(response.data)) {
                    return response.data;
                }
                // If already an array, return as is
                if (Array.isArray(response)) {
                    return response;
                }
                return [];
            },
        }),
        sendSupportMessage: builder.mutation({
            query: ({ chatId, message }) => ({
                url: `/support-chat/${chatId}/messages`,
                method: "POST",
                body: { message },
            }),
            invalidatesTags: ["SupportChat"],
        }),

        // Car Chat Endpoints (Buyer-Seller)
        createCarChat: builder.mutation({
            query: (carId) => ({
                url: `/car-chat/car/${carId}`,
                method: "POST",
            }),
            invalidatesTags: ["CarChat"],
        }),
        getCarChatByCarId: builder.query({
            query: (carId) => `/car-chat/car/${carId}`,
            providesTags: ["CarChat"],
            transformResponse: (response) => response?.data || response,
        }),
        getCarChats: builder.query({
            query: () => "/car-chat/my-chats",
            providesTags: ["CarChat"],
            transformResponse: (response) => {
                if (response?.data && Array.isArray(response.data)) {
                    return response.data;
                }
                if (Array.isArray(response)) {
                    return response;
                }
                return [];
            },
        }),
        getSellerBuyerChats: builder.query({
            query: () => "/car-chat/seller/chats",
            providesTags: ["CarChat"],
            transformResponse: (response) => {
                if (response?.data && Array.isArray(response.data)) {
                    return response.data;
                }
                if (Array.isArray(response)) {
                    return response;
                }
                return [];
            },
        }),
        getCarChatMessages: builder.query({
            query: (chatId) => `/car-chat/${chatId}/messages`,
            providesTags: ["CarChat"],
            transformResponse: (response) => {
                if (response?.data && Array.isArray(response.data)) {
                    return response.data;
                }
                if (Array.isArray(response)) {
                    return response;
                }
                return [];
            },
        }),
        sendCarChatMessage: builder.mutation({
            query: ({ chatId, message, messageType = 'text', attachments = [] }) => ({
                url: `/car-chat/${chatId}/messages`,
                method: "POST",
                body: { message, messageType, attachments },
            }),
            invalidatesTags: ["CarChat"],
        }),
        editCarChatMessage: builder.mutation({
            query: ({ messageId, message }) => ({
                url: `/car-chat/messages/${messageId}`,
                method: "PUT",
                body: { message },
            }),
            invalidatesTags: ["CarChat"],
        }),
        deleteCarChatMessage: builder.mutation({
            query: (messageId) => ({
                url: `/car-chat/messages/${messageId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CarChat"],
        }),

        // Mark Car as Sold/Available
        markCarAsSold: builder.mutation({
            query: ({ carId, isSold }) => ({
                url: `/cars/${carId}/sold`,
                method: "PUT",
                body: { isSold },
            }),
            invalidatesTags: ["Cars", "User"],
        }),

        // Edit Car
        editCar: builder.mutation({
            query: ({ carId, formData }) => ({
                url: `/cars/${carId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Cars", "User"],
            transformResponse: (response) => {
                return response?.data || response;
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
    useGetCarsQuery,
    useGetSingleCarQuery,
    useCreateCarMutation,
    useGetFilteredCarsQuery,
    useGetMyCarsQuery,
    useCreateSupportChatMutation,
    useGetUserSupportChatsQuery,
    useGetSupportChatMessagesQuery,
    useSendSupportMessageMutation,
    useCreateCarChatMutation,
    useGetCarChatByCarIdQuery,
    useGetCarChatsQuery,
    useGetSellerBuyerChatsQuery,
    useGetCarChatMessagesQuery,
    useSendCarChatMessageMutation,
    useEditCarChatMessageMutation,
    useDeleteCarChatMessageMutation,
    useMarkCarAsSoldMutation,
    useEditCarMutation,
} = api;
