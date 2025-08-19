import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-accent-blue rounded-full animate-spin"></div>
        <div className="mt-4 text-center">
          <p className="text-white text-lg font-medium">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;