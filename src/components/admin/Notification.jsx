import { useEffect } from "react";
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

const Notification = ({ 
    id, 
    type = "info", 
    title, 
    message, 
    duration = 5000, 
    onClose 
}) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case "success":
                return <FiCheckCircle className="h-6 w-6 text-green-500" />;
            case "error":
                return <FiAlertCircle className="h-6 w-6 text-red-500" />;
            default:
                return <FiInfo className="h-6 w-6 text-blue-500" />;
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case "success":
                return "bg-green-50 border-green-200";
            case "error":
                return "bg-red-50 border-red-200";
            default:
                return "bg-blue-50 border-blue-200";
        }
    };

    return (
        <div className={`max-w-sm w-full rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden border ${getBackgroundColor()}`}>
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {getIcon()}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        {title && (
                            <p className="text-sm font-medium text-gray-900">
                                {title}
                            </p>
                        )}
                        {message && (
                            <p className="mt-1 text-sm text-gray-500">
                                {message}
                            </p>
                        )}
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            onClick={() => onClose(id)}
                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;