import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
// const BASE_URL = import.meta.env.VITE_API_URL || "https://sello-backend.onrender.com/api";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { extra, endpoint }) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            // Don't set Content-Type for FormData - browser will set it with boundary
            // RTK Query will handle this automatically
            return headers;
        },
    }),
    tagTypes: ["Admin", "Users", "Cars", "Dealers", "Categories", "Blogs", "Notifications", "Chats", "Analytics", "Settings", "Promotions", "SupportChat", "ContactForms", "CustomerRequests", "Banners", "Testimonials", "Roles", "Invites"],
    endpoints: (builder) => ({
        // Dashboard
        getDashboardStats: builder.query({
            query: () => "/admin/dashboard",
            providesTags: ["Admin"],
            transformResponse: (response) => response?.data || response,
        }),

        // Users
        getAllUsers: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/admin/users?${searchParams}`;
            },
            providesTags: ["Users"],
            transformResponse: (response) => response?.data || response,
        }),
        getUserById: builder.query({
            query: (userId) => `/admin/users/${userId}`,
            providesTags: ["Users"],
            transformResponse: (response) => response?.data || response,
        }),
        updateUser: builder.mutation({
            query: ({ userId, ...data }) => ({
                url: `/admin/users/${userId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),

        // Listings (Cars)
        getAllListings: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/admin/listings?${searchParams}`;
            },
            providesTags: ["Cars"],
            transformResponse: (response) => response?.data || response,
        }),
        approveCar: builder.mutation({
            query: ({ carId, isApproved, rejectionReason }) => ({
                url: `/admin/listings/${carId}/approve`,
                method: "PUT",
                body: { isApproved, rejectionReason },
            }),
            invalidatesTags: ["Cars"],
        }),
        featureCar: builder.mutation({
            query: ({ carId, featured }) => ({
                url: `/admin/listings/${carId}/feature`,
                method: "PUT",
                body: { featured },
            }),
            invalidatesTags: ["Cars"],
        }),
        deleteCar: builder.mutation({
            query: (carId) => ({
                url: `/admin/listings/${carId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cars"],
        }),

        // Dealers
        getAllDealers: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/admin/dealers?${searchParams}`;
            },
            providesTags: ["Dealers"],
            transformResponse: (response) => response?.data || response,
        }),
        verifyDealer: builder.mutation({
            query: ({ userId, verified }) => ({
                url: `/admin/dealers/${userId}/verify`,
                method: "PUT",
                body: { verified },
            }),
            invalidatesTags: ["Dealers"],
        }),

        // Categories
        getAllCategories: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/categories?${searchParams}`;
            },
            providesTags: ["Categories"],
            transformResponse: (response) => response?.data || response,
        }),
        createCategory: builder.mutation({
            query: (data) => {
                // If data is FormData, don't set Content-Type (browser will set it with boundary)
                const isFormData = data instanceof FormData;
                return {
                    url: "/categories",
                    method: "POST",
                    body: data,
                    ...(isFormData ? {} : { headers: { 'Content-Type': 'application/json' } })
                };
            },
            invalidatesTags: ["Categories"],
        }),
        updateCategory: builder.mutation({
            query: ({ categoryId, data }) => {
                // If data is FormData, don't set Content-Type (browser will set it with boundary)
                const isFormData = data instanceof FormData;
                return {
                    url: `/categories/${categoryId}`,
                    method: "PUT",
                    body: data,
                    ...(isFormData ? {} : { headers: { 'Content-Type': 'application/json' } })
                };
            },
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `/categories/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),

        // Blogs
        getAllBlogs: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/blogs?${searchParams}`;
            },
            providesTags: ["Blogs"],
            transformResponse: (response) => response?.data || response,
        }),
        createBlog: builder.mutation({
            query: (formData) => ({
                url: "/blogs",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Blogs"],
        }),
        updateBlog: builder.mutation({
            query: ({ blogId, formData }) => ({
                url: `/blogs/${blogId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Blogs"],
        }),
        deleteBlog: builder.mutation({
            query: (blogId) => ({
                url: `/blogs/${blogId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blogs"],
        }),

        // Notifications
        getAllNotifications: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/notifications?${searchParams}`;
            },
            providesTags: ["Notifications"],
            transformResponse: (response) => response?.data || response,
        }),
        createNotification: builder.mutation({
            query: (data) => ({
                url: "/notifications",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Notifications"],
        }),
        deleteNotification: builder.mutation({
            query: (notificationId) => ({
                url: `/notifications/${notificationId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Notifications"],
        }),

        // Chat Monitoring
        getAllChats: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/chat?${searchParams}`;
            },
            providesTags: ["Chats"],
            transformResponse: (response) => response?.data || response,
        }),
        getChatMessages: builder.query({
            query: ({ chatId, ...params }) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/chat/${chatId}/messages?${searchParams}`;
            },
            providesTags: ["Chats"],
            transformResponse: (response) => response?.data || response,
        }),
        getChatStatistics: builder.query({
            query: () => "/chat/statistics",
            providesTags: ["Chats"],
            transformResponse: (response) => response?.data || response,
        }),
        getAllMessages: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/chat/messages/all?${searchParams}`;
            },
            providesTags: ["Chats"],
            transformResponse: (response) => response?.data || response,
        }),
        sendChatMessage: builder.mutation({
            query: ({ chatId, message }) => ({
                url: `/chat/${chatId}/messages`,
                method: "POST",
                body: { message },
            }),
            invalidatesTags: ["Chats"],
        }),
        deleteChatMessage: builder.mutation({
            query: (messageId) => ({
                url: `/chat/messages/${messageId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Chats"],
        }),
        editChatMessage: builder.mutation({
            query: ({ messageId, message }) => ({
                url: `/chat/messages/${messageId}`,
                method: "PUT",
                body: { message },
            }),
            invalidatesTags: ["Chats"],
        }),

        // Analytics
        getAnalytics: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/analytics?${searchParams}`;
            },
            providesTags: ["Analytics"],
            transformResponse: (response) => response?.data || response,
        }),

        // Promotions
        getAllPromotions: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/promotions?${searchParams}`;
            },
            providesTags: ["Promotions"],
            transformResponse: (response) => response?.data || response,
        }),
        getPromotionStats: builder.query({
            query: () => "/promotions/statistics",
            providesTags: ["Promotions"],
            transformResponse: (response) => response?.data || response,
        }),

        // Settings
        getAllSettings: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/settings?${searchParams}`;
            },
            providesTags: ["Settings"],
            transformResponse: (response) => response?.data || response,
        }),
        upsertSetting: builder.mutation({
            query: ({ key, ...data }) => ({
                url: `/settings/${key}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Settings"],
        }),

        // Chatbot
        getChatbotConfig: builder.query({
            query: () => "/chatbot/config",
            providesTags: ["Settings"],
            transformResponse: (response) => response?.data || response,
        }),
        updateChatbotConfig: builder.mutation({
            query: (data) => ({
                url: "/chatbot/config",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Settings"],
        }),
        getChatbotStats: builder.query({
            query: () => "/chatbot/statistics",
            providesTags: ["Settings"],
            transformResponse: (response) => response?.data || response,
        }),
        getQuickReplies: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/chatbot/quick-replies?${searchParams}`;
            },
            providesTags: ["Settings"],
            transformResponse: (response) => response?.data || response,
        }),
        createQuickReply: builder.mutation({
            query: (data) => ({
                url: "/chatbot/quick-replies",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Settings"],
        }),
        updateQuickReply: builder.mutation({
            query: ({ replyId, ...data }) => ({
                url: `/chatbot/quick-replies/${replyId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Settings"],
        }),
        deleteQuickReply: builder.mutation({
            query: (replyId) => ({
                url: `/chatbot/quick-replies/${replyId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Settings"],
        }),
        useQuickReply: builder.mutation({
            query: (replyId) => ({
                url: `/chatbot/quick-replies/${replyId}/use`,
                method: "POST",
            }),
            invalidatesTags: ["Settings"],
        }),

        // Support Chat (Admin)
        getAllSupportChats: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/support-chat?${searchParams}`;
            },
            providesTags: ["SupportChat"],
            transformResponse: (response) => response?.data || response,
        }),
        getSupportChatMessagesAdmin: builder.query({
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
        sendAdminResponse: builder.mutation({
            query: ({ chatId, message }) => ({
                url: `/support-chat/${chatId}/admin-response`,
                method: "POST",
                body: { message },
            }),
            invalidatesTags: ["SupportChat"],
        }),
        updateSupportChatStatus: builder.mutation({
            query: ({ chatId, status, priority }) => ({
                url: `/support-chat/${chatId}/status`,
                method: "PUT",
                body: { status, priority },
            }),
            invalidatesTags: ["SupportChat"],
        }),

        // Contact Forms
        getAllContactForms: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/contact-form?${searchParams}`;
            },
            providesTags: ["ContactForms"],
            transformResponse: (response) => response?.data || response,
        }),
        getContactFormById: builder.query({
            query: (id) => `/contact-form/${id}`,
            providesTags: ["ContactForms"],
            transformResponse: (response) => response?.data || response,
        }),
        convertToChat: builder.mutation({
            query: (id) => ({
                url: `/contact-form/${id}/convert-to-chat`,
                method: "POST",
            }),
            invalidatesTags: ["ContactForms", "SupportChat"],
        }),
        updateContactFormStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/contact-form/${id}/status`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["ContactForms"],
        }),
        deleteContactForm: builder.mutation({
            query: (id) => ({
                url: `/contact-form/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ContactForms"],
        }),

        // Customer Requests
        getAllCustomerRequests: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/customer-requests?${searchParams}`;
            },
            providesTags: ["CustomerRequests"],
            transformResponse: (response) => response?.data || response,
        }),
        getCustomerRequestById: builder.query({
            query: (requestId) => `/customer-requests/${requestId}`,
            providesTags: ["CustomerRequests"],
            transformResponse: (response) => response?.data || response,
        }),
        getCustomerRequestStatistics: builder.query({
            query: () => "/customer-requests/statistics",
            providesTags: ["CustomerRequests"],
            transformResponse: (response) => response?.data || response,
        }),
        updateCustomerRequest: builder.mutation({
            query: ({ requestId, ...data }) => ({
                url: `/customer-requests/${requestId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["CustomerRequests"],
        }),
        addCustomerRequestResponse: builder.mutation({
            query: ({ requestId, message }) => ({
                url: `/customer-requests/${requestId}/response`,
                method: "POST",
                body: { message },
            }),
            invalidatesTags: ["CustomerRequests"],
        }),
        deleteCustomerRequest: builder.mutation({
            query: (requestId) => ({
                url: `/customer-requests/${requestId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CustomerRequests"],
        }),

        // Banners
        getAllBanners: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/banners?${searchParams}`;
            },
            providesTags: ["Banners"],
            transformResponse: (response) => response?.data || response,
        }),
        getBannerById: builder.query({
            query: (bannerId) => `/banners/${bannerId}`,
            providesTags: ["Banners"],
            transformResponse: (response) => response?.data || response,
        }),
        createBanner: builder.mutation({
            query: (formData) => ({
                url: "/banners",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Banners"],
        }),
        updateBanner: builder.mutation({
            query: ({ bannerId, formData }) => ({
                url: `/banners/${bannerId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Banners"],
        }),
        deleteBanner: builder.mutation({
            query: (bannerId) => ({
                url: `/banners/${bannerId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Banners"],
        }),

        // Testimonials
        getAllTestimonials: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams(params).toString();
                return `/testimonials?${searchParams}`;
            },
            providesTags: ["Testimonials"],
            transformResponse: (response) => response?.data || response,
        }),
        getTestimonialById: builder.query({
            query: (testimonialId) => `/testimonials/${testimonialId}`,
            providesTags: ["Testimonials"],
            transformResponse: (response) => response?.data || response,
        }),
        createTestimonial: builder.mutation({
            query: (formData) => ({
                url: "/testimonials",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Testimonials"],
        }),
        updateTestimonial: builder.mutation({
            query: ({ testimonialId, formData }) => ({
                url: `/testimonials/${testimonialId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Testimonials"],
        }),
        deleteTestimonial: builder.mutation({
            query: (testimonialId) => ({
                url: `/testimonials/${testimonialId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Testimonials"],
        }),

        // Roles & Permissions
        getAllRoles: builder.query({
            query: () => "/roles",
            providesTags: ["Roles"],
            transformResponse: (response) => response?.data || response,
        }),
        getRoleById: builder.query({
            query: (roleId) => `/roles/${roleId}`,
            providesTags: ["Roles"],
            transformResponse: (response) => response?.data || response,
        }),
        createRole: builder.mutation({
            query: (data) => ({
                url: "/roles",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Roles"],
        }),
        updateRole: builder.mutation({
            query: ({ roleId, ...data }) => ({
                url: `/roles/${roleId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Roles"],
        }),
        deleteRole: builder.mutation({
            query: (roleId) => ({
                url: `/roles/${roleId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Roles"],
        }),
        getPermissionMatrix: builder.query({
            query: () => "/roles/matrix",
            providesTags: ["Roles"],
            transformResponse: (response) => response?.data || response,
        }),
        inviteUser: builder.mutation({
            query: (data) => ({
                url: "/roles/invite",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Invites", "Users"],
        }),
        getAllInvites: builder.query({
            query: () => "/roles/invites/all",
            providesTags: ["Invites"],
            transformResponse: (response) => response?.data || response,
        }),
        // Public invite endpoints (no auth required)
        getInviteByToken: builder.query({
            query: (token) => `/roles/invite/${token}`,
            transformResponse: (response) => response?.data || response,
        }),
        acceptInvite: builder.mutation({
            query: ({ token, password }) => ({
                url: `/roles/invite/${token}/accept`,
                method: "POST",
                body: { password },
            }),
            transformResponse: (response) => {
                // Server returns: { success, message, data: { user, token } }
                // Extract data field
                if (response?.data) {
                    return response.data;
                }
                return response;
            },
        }),
    }),
});

export const {
    useGetDashboardStatsQuery,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetAllListingsQuery,
    useApproveCarMutation,
    useFeatureCarMutation,
    useDeleteCarMutation,
    useGetAllDealersQuery,
    useVerifyDealerMutation,
    useGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useGetAllNotificationsQuery,
    useCreateNotificationMutation,
    useDeleteNotificationMutation,
    useGetAllChatsQuery,
    useGetChatMessagesQuery,
    useGetChatStatisticsQuery,
    useGetAllMessagesQuery,
    useSendChatMessageMutation,
    useDeleteChatMessageMutation,
    useEditChatMessageMutation,
    useGetAnalyticsQuery,
    useGetAllPromotionsQuery,
    useGetPromotionStatsQuery,
    useGetAllSettingsQuery,
    useUpsertSettingMutation,
    useGetChatbotConfigQuery,
    useUpdateChatbotConfigMutation,
    useGetChatbotStatsQuery,
    useGetQuickRepliesQuery,
    useCreateQuickReplyMutation,
    useUpdateQuickReplyMutation,
    useDeleteQuickReplyMutation,
    useUseQuickReplyMutation,
    useGetAllSupportChatsQuery,
    useGetSupportChatMessagesAdminQuery,
    useSendAdminResponseMutation,
    useUpdateSupportChatStatusMutation,
    useGetAllContactFormsQuery,
    useGetContactFormByIdQuery,
    useConvertToChatMutation,
    useUpdateContactFormStatusMutation,
    useDeleteContactFormMutation,
    useGetAllCustomerRequestsQuery,
    useGetCustomerRequestByIdQuery,
    useGetCustomerRequestStatisticsQuery,
    useUpdateCustomerRequestMutation,
    useAddCustomerRequestResponseMutation,
    useDeleteCustomerRequestMutation,
    useGetAllBannersQuery,
    useGetBannerByIdQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
    useGetAllTestimonialsQuery,
    useGetTestimonialByIdQuery,
    useCreateTestimonialMutation,
    useUpdateTestimonialMutation,
    useDeleteTestimonialMutation,
    useGetAllRolesQuery,
    useGetRoleByIdQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
    useGetPermissionMatrixQuery,
    useInviteUserMutation,
    useGetAllInvitesQuery,
    useGetInviteByTokenQuery,
    useAcceptInviteMutation,
} = adminApi;

