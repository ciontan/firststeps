import React from "react";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onAdd: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAdd }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 min-h-[60vh]">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-brown mb-2 text-center">
      No listings yet
    </h3>
    <p className="text-gray-500 mb-6 text-center text-sm sm:text-base max-w-md">
      Start selling your baby items to help other families
    </p>
    <button
      onClick={onAdd}
      className="bg-brown text-white rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-wix font-bold text-sm sm:text-base"
    >
      Create Your First Listing
    </button>
  </div>
);

export default EmptyState;
