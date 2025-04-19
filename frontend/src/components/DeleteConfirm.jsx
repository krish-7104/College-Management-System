import React from "react";

const DeleteConfirm = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 transform transition-all duration-300 ease-in-out animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>

        <p className="text-gray-600 mb-6">
          {message ||
            "Are you sure you want to delete this item? This action cannot be undone."}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-center px-6 py-3 cursor-pointer font-medium text-sm rounded-md transition-all duration-300 ease-in-out bg-red-50 text-red-700 hover:bg-red-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-center px-6 py-3 cursor-pointer font-medium text-sm rounded-md transition-all duration-300 ease-in-out bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg transform -translate-y-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
