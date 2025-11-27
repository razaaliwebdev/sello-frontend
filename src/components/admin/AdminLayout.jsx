import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FiLayout,
    FiUsers,
    FiList,
    FiBriefcase,
    FiBarChart2,
    FiMessageSquare,
    FiCpu,
    FiUser,
    FiHeart,
    FiBell,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
    FiFileText,
} from "react-icons/fi";
import { images } from "../../assets/assets";
import { useGetMeQuery, useLogoutMutation } from "../../redux/services/api";
import { canAccessMenu } from "../../utils/roleAccess";

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { data: user } = useGetMeQuery();
    const [logout] = useLogoutMutation();

    const allMenuItems = [
        { path: "/admin/dashboard", icon: FiLayout, label: "Dashboard" },
        { path: "/admin/users", icon: FiUsers, label: "User Management" },
        { path: "/admin/listings", icon: FiList, label: "Listings" },
        { path: "/admin/dealers", icon: FiBriefcase, label: "Dealer Management" },
        { path: "/admin/blogs", icon: FiFileText, label: "Blog Management" },
        { path: "/admin/analytics", icon: FiBarChart2, label: "Reports & Analytics" },
        { path: "/admin/chat", icon: FiMessageSquare, label: "Chat Monitoring" },
        { path: "/admin/chatbot", icon: FiCpu, label: "Support Chatbot" },
        { path: "/admin/customers", icon: FiUser, label: "Customer Request" },
        { path: "/admin/promotions", icon: FiHeart, label: "Promotions" },
        { path: "/admin/notifications", icon: FiBell, label: "Notifications" },
        { path: "/admin/settings", icon: FiSettings, label: "Settings" },
    ];

    // Filter menu items based on user's role
    // Super Admin sees all, team members see only their allowed tabs
    const menuItems = allMenuItems.filter(item => canAccessMenu(user, item.path));

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar - Dark Grey */}
            <aside
                className={`${sidebarOpen ? "w-64" : "w-20"
                    } bg-[#050B20] text-white transition-all duration-300 flex flex-col`}
            >
                {/* Logo - Primary Orange Header */}
                <div className="bg-primary-500 px-4 py-2 flex items-center justify-between">
                    {sidebarOpen && (
                        <div className="flex items-center justify-center gap-1 h-full w-full">
                            <img src={images.logo} alt="logo" className="w-24 h-24 scale-150 object-contain" />
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-primary-600 rounded-lg text-white"
                    >
                        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto py-4 scrollbar">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        // Check if current path matches or starts with the item path (for blog sub-routes)
                        const isMainItemActive = location.pathname === item.path || 
                            (item.path === "/admin/blogs" && location.pathname.startsWith("/admin/blog"));
                        
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                                    isMainItemActive
                                        ? "bg-primary-500 text-white"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                <Icon size={20} />
                                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 bg-primary-500 px-4 py-3 w-full rounded-lg text-white font-semibold hover:bg-primary-600 transition-colors"
                    >
                        <FiLogOut size={20} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Primary Bar */}
                {/* <header className="bg-primary-500 text-white py-4 px-6 shadow-md">
                    <h1 className="text-xl font-bold">Sello Admin</h1>
                </header> */}
                
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-6">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;

