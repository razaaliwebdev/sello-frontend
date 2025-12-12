import { useState, useEffect, useRef } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { io } from "socket.io-client";
import {
    useGetAllSupportChatsQuery,
    useGetSupportChatMessagesAdminQuery,
    useSendAdminResponseMutation,
    useUpdateSupportChatStatusMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiSend, FiUser, FiClock, FiAlertTriangle, FiCheckCircle, FiSearch, FiArrowLeft, FiMessageSquare, FiPaperclip, FiX, FiTrendingDown } from "react-icons/fi";
import { IoMdCheckmark, IoMdDoneAll } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";
import { useSearchParams, useNavigate } from "react-router-dom";

const SupportChatbot = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const chatIdFromUrl = searchParams.get('chatId');
    
    const [socket, setSocket] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(chatIdFromUrl || null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);
    const [isAdminTyping, setIsAdminTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const token = localStorage.getItem("token");
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
    const SOCKET_URL = BASE_URL.replace('/api', ''); // Remove /api if present

    const { data: chatsData, isLoading: chatsLoading, refetch: refetchChats } = useGetAllSupportChatsQuery({
        status: activeTab === "all" ? undefined : activeTab,
    }, {
        refetchOnMountOrArgChange: true
    });

    const { data: messagesData, isLoading: messagesLoading, refetch: refetchMessages } = useGetSupportChatMessagesAdminQuery(
        selectedChatId,
        {
            skip: !selectedChatId,
            refetchOnMountOrArgChange: true
        }
    );

    const [sendAdminResponse] = useSendAdminResponseMutation();
    const [updateChatStatus] = useUpdateSupportChatStatusMutation();

    const chats = chatsData?.chats || [];
    const chatMessages = messages;

    // Initialize Socket.IO
    useEffect(() => {
        if (!token) return;

        const newSocket = io(SOCKET_URL, {
            auth: { token },
            query: { token },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 10,
            timeout: 20000,
            randomizationFactor: 0.5
        });

        newSocket.on('connect', () => {
            console.log('Admin support socket connected');
            setSocketConnected(true);
            newSocket.emit('join-chats');
            if (selectedChatId) {
                newSocket.emit('join-chat', selectedChatId);
            }
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Admin support socket disconnected:', reason);
            setSocketConnected(false);
            // Attempt to reconnect
            if (reason === 'io server disconnect') {
                // Server disconnected, attempt to reconnect
                newSocket.connect();
            }
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            toast.error('Connection failed. Retrying...');
        });

        newSocket.on('connect_timeout', (timeout) => {
            console.error('Socket connection timeout:', timeout);
            toast.error('Connection timeout. Retrying...');
        });

        newSocket.on('error', (error) => {
            console.error('Socket error:', error);
            toast.error('Connection error occurred');
        });

        newSocket.on('joined-chat', (chatId) => {
            console.log('Admin joined chat:', chatId);
        });

        newSocket.on('new-message', (data) => {
            console.log('New support message received:', data);
            if (data.chatId === selectedChatId || data.chat?._id === selectedChatId) {
                setMessages(prev => {
                    // Filter out temporary messages and duplicates
                    const filteredMessages = prev.filter(msg => 
                        !msg._id?.startsWith('temp-') && msg._id !== data.message._id
                    );
                    return [...filteredMessages, data.message];
                });
                // Scroll to bottom when new message arrives
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
            // Refetch chats to update unread counts
            refetchChats();
        });

        newSocket.on('typing', (data) => {
            if (data.chatId === selectedChatId) {
                setTypingUsers(data.userNames || []);
            }
        });

        newSocket.on('message-deleted', (data) => {
            if (data.chatId === selectedChatId) {
                setMessages(prev => prev.filter(msg => msg._id !== data.messageId));
            }
        });

        newSocket.on('message-seen', (data) => {
            // Update message seen status
            setMessages(prev => prev.map(msg => 
                msg._id === data.messageId 
                    ? { ...msg, seenBy: data.seenBy, isRead: true }
                    : msg
            ));
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [token, selectedChatId]);

    // Load messages when chat is selected or messagesData changes
    useEffect(() => {
        if (messagesData) {
            const messagesArray = Array.isArray(messagesData) 
                ? messagesData 
                : (messagesData?.data || []);
            // Load messages
            // Filter out temporary messages when loading new data
            setMessages(prev => {
                const filteredPrev = prev.filter(msg => !msg._id?.startsWith('temp-'));
                return [...filteredPrev, ...messagesArray];
            });
        } else {
            setMessages([]);
        }
    }, [messagesData, selectedChatId]);

    // Select chat from URL on mount
    useEffect(() => {
        if (chatIdFromUrl && chatIdFromUrl !== selectedChatId) {
            handleSelectChat(chatIdFromUrl);
        }
    }, [chatIdFromUrl]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages, typingUsers]);

    const handleSelectChat = (chatId) => {
        setSelectedChatId(chatId);
        // Clear messages but keep temporary messages
        setMessages(prev => prev.filter(msg => msg._id?.startsWith('temp-')));
        if (socket) {
            socket.emit('join-chat', chatId);
        }
        setTimeout(() => {
            refetchMessages();
        }, 100);
    };

    const handleTyping = () => {
        if (!socket || !selectedChatId) return;

        socket.emit('typing', { chatId: selectedChatId, isTyping: true });

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('typing', { chatId: selectedChatId, isTyping: false });
        }, 1000);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || !selectedChatId) return;

        const messageText = message.trim();
        setMessage("");

        try {
            if (socket && socket.connected) {
                // Send via socket for real-time delivery
                socket.emit('send-message', {
                    chatId: selectedChatId,
                    message: messageText,
                    messageType: 'text',
                    isAdminResponse: true
                });
                // Optimistically add the message to UI with unique temporary ID
                const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                const tempMessage = {
                    _id: tempId,
                    message: messageText,
                    sender: 'admin',
                    isAdminResponse: true,
                    createdAt: new Date()
                };
                setMessages(prev => [...prev, tempMessage]);
                // Scroll to bottom
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
            } else {
                // Fallback to HTTP if socket not connected
                const result = await sendAdminResponse({
                    chatId: selectedChatId,
                    message: messageText,
                }).unwrap();
                
                // Add message to state
                if (result?.data) {
                    setMessages(prev => [...prev, result.data]);
                }
                
                refetchMessages();
                toast.success("Message sent");
            }
        } catch (error) {
            // Error handled by toast
            toast.error(error?.data?.message || "Failed to send message");
        }
    };

    const handleStatusChange = async (chatId, status, priority) => {
        try {
            await updateChatStatus({ chatId, status, priority }).unwrap();
            toast.success("Chat status updated");
            refetchChats();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update status");
        }
    };

    // Statistics
    const stats = {
        open: chats.filter(c => c.status === "open").length,
        pending: chats.filter(c => c.status === "pending").length,
        resolved: chats.filter(c => c.status === "resolved").length,
        urgent: chats.filter(c => c.priority === "urgent").length,
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/admin/chat-monitoring')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Back to Chat History"
                            >
                                <FiArrowLeft size={24} className="text-gray-600" />
                            </button>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Live Support Chat</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Chat with customers in real-time • WhatsApp-style messaging
                                </p>
                            </div>
                        </div>
                        {/* Connection Status */}
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                            <div className={`w-2 h-2 rounded-full ${
                                socketConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm font-medium text-gray-700">
                                {socketConnected ? '🟢 Live Connected' : '🔴 Disconnected'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Open Chats</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <FiClock className="text-primary-600" size={20} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            <FiTrendingUp size={12} className="text-green-500" />
                            <span className="text-xs font-medium text-green-600">+12%</span>
                            <span className="text-xs text-gray-500">vs last hour</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                <FiClock className="text-orange-600" size={20} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            <FiTrendingUp size={12} className="text-green-500" />
                            <span className="text-xs font-medium text-green-600">+5%</span>
                            <span className="text-xs text-gray-500">vs last hour</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Resolved</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <FiCheckCircle className="text-green-600" size={20} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            <FiTrendingUp size={12} className="text-green-500" />
                            <span className="text-xs font-medium text-green-600">+8%</span>
                            <span className="text-xs text-gray-500">vs last hour</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Urgent</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <FiAlertTriangle className="text-red-600" size={20} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            <FiTrendingDown size={12} className="text-red-500" />
                            <span className="text-xs font-medium text-red-600">-3%</span>
                            <span className="text-xs text-gray-500">vs last hour</span>
                        </div>
                    </div>
                </div>

                {/* WhatsApp-Style Chat Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Chat List - Left Side */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-[700px] flex flex-col">
                            {/* Search and Tabs */}
                            <div className="p-4 border-b border-gray-200 bg-gray-50">
                                <div className="relative mb-3">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                    />
                                    {searchQuery && (
                                        <button 
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <FiX size={16} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {["all", "active", "urgent"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                                activeTab === tab
                                                    ? "bg-primary-500 text-white"
                                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                            }`}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Chat List */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="divide-y divide-gray-100">
                                    {chatsLoading ? (
                                        <div className="flex justify-center py-12">
                                            <Spinner fullScreen={false} />
                                        </div>
                                    ) : chats.length === 0 ? (
                                        <div className="text-center py-12">
                                            <FiMessageSquare className="mx-auto text-gray-300 mb-3" size={48} />
                                            <p className="text-gray-500 text-sm">No support chats yet</p>
                                            <p className="text-gray-400 text-xs mt-1">Chats will appear here when customers request support</p>
                                        </div>
                                    ) : (
                                        chats
                                            .filter((chat) =>
                                                searchQuery
                                                    ? chat.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                      chat.subject?.toLowerCase().includes(searchQuery.toLowerCase())
                                                    : true
                                            )
                                            .map((chat) => (
                                                <div
                                                    key={chat._id}
                                                    onClick={() => handleSelectChat(chat._id)}
                                                    className={`p-4 cursor-pointer transition-all ${
                                                        selectedChatId === chat._id
                                                            ? "bg-primary-50 border-l-4 border-l-primary-500"
                                                            : "hover:bg-gray-50"
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 relative">
                                                            <span className="text-base font-semibold text-primary-700">
                                                                {(chat.user?.name || 'U').charAt(0).toUpperCase()}
                                                            </span>
                                                            {chat.unreadCount > 0 && (
                                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                                    {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                                    {chat.user?.name || "Unknown User"}
                                                                </p>
                                                                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                                                    {chat.lastMessageAt
                                                                        ? formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: false })
                                                                        : ""}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 font-medium truncate mb-1">
                                                                {chat.subject || "Support Request"}
                                                            </p>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-xs text-gray-500 truncate flex-1">
                                                                    {chat.lastMessage || "No messages yet"}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className={`text-xs px-2 py-0.5 rounded-full ${{
                                                                    open: 'bg-green-100 text-green-800',
                                                                    pending: 'bg-primary-100 text-primary-800',
                                                                    resolved: 'bg-gray-100 text-gray-800'
                                                                }[chat.status] || 'bg-gray-100 text-gray-800'}
                                                                `}>
                                                                    {{open: 'Open', pending: 'Pending', resolved: 'Resolved'}[chat.status] || chat.status}
                                                                </span>
                                                                {chat.priority === 'urgent' && (
                                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                                                                        Urgent
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Window - Right Side (WhatsApp Style) */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[700px] flex flex-col">
                            {!selectedChatId ? (
                                <div className="flex-1 flex items-center justify-center bg-gray-50">
                                    <div className="text-center">
                                        <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                                            <FiMessageSquare className="text-primary-500" size={64} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp-Style Live Chat</h3>
                                        <p className="text-gray-500 text-sm">Select a conversation from the list to start chatting with customers</p>
                                        <p className="text-gray-400 text-xs mt-2">Messages are delivered in real-time via Socket.IO</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Chat Header - WhatsApp Style */}
                                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center relative">
                                                    <span className="text-lg font-bold text-primary-700">
                                                        {(chats.find((c) => c._id === selectedChatId)?.user?.name || 'U').charAt(0).toUpperCase()}
                                                    </span>
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold text-gray-900">
                                                        {chats.find((c) => c._id === selectedChatId)?.user?.name || "Unknown User"}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                        <p className="text-xs text-gray-600">
                                                            {typingUsers.length > 0 ? `${typingUsers.join(', ')} typing...` : 'Online'}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {chats.find((c) => c._id === selectedChatId)?.subject || "Support Request"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={chats.find((c) => c._id === selectedChatId)?.status || 'open'}
                                                    onChange={(e) =>
                                                        handleStatusChange(selectedChatId, e.target.value, undefined)
                                                    }
                                                    className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                                                >
                                                    <option value="open">🟢 Open</option>
                                                    <option value="pending">🟡 Pending</option>
                                                    <option value="resolved">✅ Resolved</option>
                                                </select>
                                                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                                                    <FiSearch size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Messages - WhatsApp Style Background */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#ECE5DD] bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22grid%22 width=%2260%22 height=%2260%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 60 0 L 0 0 0 60%22 fill=%22none%22 stroke=%22%23d4d4d4%22 stroke-width=%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23grid)%22 opacity=%220.1%22/%3E%3C/svg%3E')]">
                                        {messagesLoading ? (
                                            <div className="flex justify-center py-12">
                                                <Spinner fullScreen={false} />
                                            </div>
                                        ) : chatMessages.length === 0 ? (
                                            <div className="text-center py-12">
                                                <div className="bg-white rounded-lg shadow-sm p-6 max-w-sm mx-auto">
                                                    <FiMessageSquare className="mx-auto text-primary-500 mb-3" size={40} />
                                                    <p className="text-gray-700 font-medium">No messages yet</p>
                                                    <p className="text-gray-500 text-sm mt-1">Start the conversation with this customer</p>
                                                </div>
                                            </div>
                                        ) : (
                                            chatMessages.map((msg) => {
                                                const isAdmin = msg.sender === 'admin' || msg.isAdminResponse;
                                                const isBot = msg.isBot;
                                                const timeStr = msg.createdAt
                                                    ? new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                                    : '';
                                                
                                                return (
                                                    <div
                                                        key={msg._id}
                                                        className={`flex ${
                                                            isAdmin ? "justify-end" : "justify-start"
                                                        }`}
                                                    >
                                                        {!isAdmin && !isBot && (
                                                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2 flex-shrink-0 self-end">
                                                                <span className="text-xs font-semibold text-primary-700">
                                                                    {(msg.sender?.name || 'U').charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div
                                                            className={`max-w-md px-3 py-2 rounded-lg shadow-md ${
                                                                isAdmin
                                                                    ? "bg-primary-500 text-white rounded-tr-none"
                                                                    : isBot
                                                                    ? "bg-gray-200 text-gray-800 rounded-tl-none"
                                                                    : "bg-white text-gray-900 rounded-tl-none"
                                                            }`}
                                                        >
                                                            {isBot && (
                                                                <p className="text-xs font-semibold mb-1 text-gray-700">🤖 AI Assistant</p>
                                                            )}
                                                            {!isAdmin && !isBot && (
                                                                <p className="text-xs font-semibold mb-1 text-gray-700">
                                                                    {msg.sender?.name || 'Customer'}
                                                                </p>
                                                            )}
                                                            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{msg.message}</p>
                                                            {msg.attachments && msg.attachments.length > 0 && (
                                                                <div className="flex flex-wrap gap-2 mt-2">
                                                                    {msg.attachments.map((attachment, idx) => (
                                                                        <div key={idx} className="relative group">
                                                                            <img 
                                                                                src={attachment} 
                                                                                alt="Attachment" 
                                                                                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                                                            />
                                                                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <FiSearch className="text-white" size={20} />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            <div className="flex items-center justify-end gap-1 mt-1">
                                                                <span
                                                                    className={`text-xs ${
                                                                        isAdmin
                                                                            ? "text-primary-100"
                                                                            : "text-gray-500"
                                                                    }`}
                                                                >
                                                                    {timeStr}
                                                                </span>
                                                                {isAdmin && (
                                                                    msg.isRead || msg.seenBy?.length > 0 ? (
                                                                        <IoMdDoneAll className={msg.seenBy?.length > 0 ? "text-blue-300" : "text-white opacity-70"} size={16} />
                                                                    ) : (
                                                                        <IoMdCheckmark className="text-white opacity-70" size={16} />
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                        {/* Typing indicator - WhatsApp Style */}
                                        {typingUsers.length > 0 && (
                                            <div className="flex justify-start items-end">
                                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                                                    <span className="text-xs font-semibold text-primary-700">...</span>
                                                </div>
                                                <div className="bg-white px-4 py-2 rounded-lg rounded-tl-none shadow-md">
                                                    <div className="flex gap-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</p>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Message Input - WhatsApp Style */}
                                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-gray-50">
                                        <div className="flex gap-3 items-center mb-2">
                                            <button 
                                                type="button"
                                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                                                title="Attach file"
                                            >
                                                <FiPaperclip size={20} />
                                            </button>
                                            <input
                                                type="text"
                                                value={message}
                                                onChange={(e) => {
                                                    setMessage(e.target.value);
                                                    handleTyping();
                                                }}
                                                placeholder="Type a message..."
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage(e);
                                                    }
                                                }}
                                            />
                                            <button
                                                type="submit"
                                                disabled={!message.trim()}
                                                className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-lg"
                                                title="Send message"
                                            >
                                                <FiSend size={20} />
                                            </button>
                                        </div>
                                        {isAdminTyping && (
                                            <p className="text-xs text-gray-500 mt-2 ml-4">Admin is typing...</p>
                                        )}
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Replies Section */}
                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Quick Replies</h3>
                        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center gap-2 text-sm">
                            <span className="text-lg">+</span>
                            New
                        </button>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-gray-500">No templates yet</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SupportChatbot;
