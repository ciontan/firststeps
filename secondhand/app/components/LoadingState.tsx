import React from "react";

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full"></div>
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-brown mb-2 text-center">
      Loading your listings...
    </h3>
    <p className="text-gray-500 text-center text-sm sm:text-base max-w-md">
      Please wait while we fetch your products
    </p>
  </div>
);

export default LoadingState;
