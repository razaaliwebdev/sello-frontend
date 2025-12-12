import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirm Action", 
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm", 
    cancelText = "Cancel", 
    variant = "danger",
    isLoading = false
}) => {
    if (!isOpen) return null;
    
    const variantStyles = {
        danger: {
            button: "bg-red-500 hover:bg-red-600 text-white",
            icon: "text-red-500"
        },
        warning: {
            button: "bg-yellow-500 hover:bg-yellow-600 text-white",
            icon: "text-yellow-500"
        },
        info: {
            button: "bg-blue-500 hover:bg-blue-600 text-white",
            icon: "text-blue-500"
        }
    };
    
    const styles = variantStyles[variant] || variantStyles.danger;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <FiAlertTriangle className={styles.icon} size={24} />
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                            disabled={isLoading}
                        >
                            <FiX size={20} />
                        </button>
                    </div>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`px-4 py-2 ${styles.button} rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                        >
                            {isLoading && (
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
