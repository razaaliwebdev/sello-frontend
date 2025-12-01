import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import Spinner from "./components/Spinner.jsx";
import Navbar from "./components/Navbar.jsx";
import BottomHeader from "./components/BottomHeader.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppChatWidget from "./components/support/WhatsAppChatWidget.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/SignUp.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import VerifyOtp from "./pages/auth/VerifyOtp.jsx";
import ResetSuccess from "./pages/auth/ResetSuccess.jsx";
import AcceptInvite from "./pages/auth/AcceptInvite.jsx";
import OurPrivacyPolicy from "./pages/ourPages/OurPrivacyPolicy.jsx";
import TermsCondition from "./pages/ourPages/TermsCondition.jsx";
import CarListings from "./pages/listings/CarListings.jsx";
import CarDetails from "./pages/listings/CarDetails.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import CreatePost from "./pages/posts/CreatePost.jsx";
import EditCar from "./pages/posts/EditCar.jsx";
import AllBrands from "./pages/AllBrands.jsx";
import FilterPage from "./pages/filter/FilterPage.jsx";
import FilteredResults from "./pages/listings/FilteredResults.jsx";
import UserListingPage from "./pages/userListings/UserListingPage.jsx";
import LoanPlansPage from "./pages/loanPlans/LoanPlansPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Blog from "./pages/blog/Blog.jsx";
import AllBlog from "./pages/blog/AllBlog.jsx";
import BlogDetails from "./pages/blog/BlogDetails.jsx";
import MyChats from "./pages/chats/MyChats.jsx";
import SellerChats from "./pages/seller/SellerChats.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminUsers from "./pages/admin/Users.jsx";
import AdminListings from "./pages/admin/Listings.jsx";
import AdminDealers from "./pages/admin/Dealers.jsx";
import AdminCategories from "./pages/admin/Categories.jsx";
import AdminBlogs from "./pages/admin/Blogs.jsx";
import BlogCreate from "./pages/admin/BlogCreate.jsx";
import BlogEdit from "./pages/admin/BlogEdit.jsx";
import AdminAnalytics from "./pages/admin/Analytics.jsx";
import AdminReports from "./pages/admin/Reports.jsx";
import AdminChatMonitoring from "./pages/admin/ChatMonitoring.jsx";
import AdminChatbot from "./pages/admin/Chatbot.jsx";
import AdminCustomers from "./pages/admin/CustomerRequests.jsx";
import AdminPromotions from "./pages/admin/Promotions.jsx";
import AdminNotifications from "./pages/admin/Notifications.jsx";
import SupportChat from "./pages/admin/SupportChat.jsx";
import SupportChatbot from "./pages/admin/SupportChatbot.jsx";
import ContactFormManagement from "./pages/admin/ContactFormManagement.jsx";
import CustomerRequests from "./pages/admin/CustomerRequests.jsx";
import Banners from "./pages/admin/Banners.jsx";
import Testimonials from "./pages/admin/Testimonials.jsx";
import Settings from "./pages/admin/Settings.jsx";

// New Blog Management Pages
import BlogsOverview from "./pages/admin/BlogsOverview.jsx";
import BlogCategories from "./pages/admin/BlogCategories.jsx";
import BlogCreateEnhanced from "./pages/admin/BlogCreateEnhanced.jsx";
import BlogComments from "./pages/admin/BlogComments.jsx";
import BlogMediaLibrary from "./pages/admin/BlogMediaLibrary.jsx";

// Protected Routes
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import AdminRoute from "./components/common/AdminRoute.jsx";

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const location = useLocation();

  // Initial app load
  useEffect(() => {
    const handleLoad = () => setInitialLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Page transition loading
  useEffect(() => {
    setPageLoading(true);
    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (initialLoading || pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={80} color="text-purple-500" thickness={5} speed="fast" />
      </div>
    );
  }

  const hideNavbarFooter = [
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
    "/reset-success",
    "/accept-invite",
  ];

  return (
    <>
      <Toaster />

      {/* Show Navbar + BottomHeader except for auth pages + admin */}
      {!hideNavbarFooter.includes(location.pathname) &&
        !location.pathname.startsWith("/admin") && (
          <>
            <Navbar />
            <BottomHeader />
          </>
        )}

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/accept-invite/:token" element={<AcceptInvite />} />

        {/* Public pages */}
        <Route path="/privacy-policy" element={<OurPrivacyPolicy />} />
        <Route path="/terms-conditon" element={<TermsCondition />} />
        <Route path="/cars" element={<CarListings />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/view-all-brands" element={<AllBrands />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/search-results" element={<FilteredResults />} />
        <Route path="/loan-plans" element={<LoanPlansPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/all" element={<AllBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Protected User Routes */}
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-car/:id"
          element={
            <ProtectedRoute>
              <EditCar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-listings"
          element={
            <ProtectedRoute>
              <UserListingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-chats"
          element={
            <ProtectedRoute>
              <MyChats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/chats"
          element={
            <ProtectedRoute>
              <SellerChats />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/listings" element={<AdminListings />} />
          <Route path="/admin/dealers" element={<AdminDealers />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          {/* Blog Management Routes */}
          <Route path="/admin/blogs" element={<BlogsOverview />} />
          <Route path="/admin/blog-categories" element={<BlogCategories />} />
          <Route path="/admin/blogs/create" element={<BlogCreateEnhanced />} />
          <Route path="/admin/blogs/:id/edit" element={<BlogEdit />} />
          <Route path="/admin/blog-comments" element={<BlogComments />} />
          <Route path="/admin/blog-media" element={<BlogMediaLibrary />} />
          <Route path="/admin/analytics" element={<AdminReports />} />
          <Route path="/admin/chat" element={<AdminChatMonitoring />} />
          <Route path="/admin/chatbot" element={<AdminChatbot />} />
          <Route path="/admin/customers" element={<CustomerRequests />} />
          <Route path="/admin/promotions" element={<AdminPromotions />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/support-chat" element={<SupportChat />} />
          <Route path="/admin/support-chatbot" element={<SupportChatbot />} />
          <Route path="/admin/contact-forms" element={<ContactFormManagement />} />
          <Route path="/admin/customer-requests" element={<CustomerRequests />} />
          <Route path="/admin/banners" element={<Banners />} />
          <Route path="/admin/testimonials" element={<Testimonials />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>
      </Routes>

      {/* Show Footer except for auth pages & admin */}
      {!hideNavbarFooter.includes(location.pathname) &&
        !location.pathname.startsWith("/admin") && <Footer />}

      {/* Support Chat Widget - Show on all pages except auth and admin */}
      {!hideNavbarFooter.includes(location.pathname) &&
        !location.pathname.startsWith("/admin") && <WhatsAppChatWidget />}
    </>
  );
};

export default App;