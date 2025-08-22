import type { Product } from "../types";
import Image from "next/image";
import React from "react";
import { Edit3, Trash2, Eye, MoreHorizontal } from "lucide-react";

type ListingStatus = keyof typeof STATUS_COLORS;

const STATUS_COLORS = {
  active: "bg-green-100 text-green-800",
  sold: "bg-gray-100 text-gray-600",
  draft: "bg-yellow-100 text-yellow-800",
  pending: "bg-blue-100 text-blue-800",
};

const STATUS_LABELS = {
  active: "Active",
  sold: "Sold",
  draft: "Draft",
  pending: "Pending",
};

type ListingsGridItemProps = {
  listing: Product & {
    status: ListingStatus;
    createdAt?: string;
    views?: number;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const ListingsGridItem: React.FC<ListingsGridItemProps> = ({
  listing,
  onEdit,
  onDelete,
}) => (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    {/* Image */}
    <div className="relative">
      <Image
        src={typeof listing.image === "string" ? listing.image : ""}
        alt={listing.name}
        width={400}
        height={192}
        className="w-full h-40 sm:h-48 object-cover"
        unoptimized={typeof listing.image === "string" ? listing.image.startsWith("/api/") : false}
      />
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[listing.status as ListingStatus]}`}
        >
          {STATUS_LABELS[listing.status as ListingStatus]}
        </span>
      </div>
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
        <button className="p-1.5 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
        </button>
      </div>
    </div>
    {/* Content */}
    <div className="p-3 sm:p-4">
      <h3 className="font-wix font-semibold text-gray-900 mb-1 line-clamp-2 text-sm sm:text-base">
        {listing.name}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-1">
        {listing.brand} • {listing.condition} • Ages{" "}
        {listing.ageRange?.start_age ?? "-"}-{listing.ageRange?.end_age ?? "-"}
      </p>
      <div className="flex items-center justify-between mb-3">
        <span className="text-base sm:text-lg font-bold text-brown">
          ${listing.price.toFixed(2)}
        </span>
      </div>
      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span className="text-xs">{listing.views ?? 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
            <span className="text-xs">{listing.likes}</span>
          </div>
        </div>
        <span className="text-xs hidden sm:inline">
          {listing.createdAt
            ? new Date(listing.createdAt).toLocaleDateString()
            : "-"}
        </span>
        <span className="text-xs sm:hidden">
          {listing.createdAt
            ? new Date(listing.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "-"}
        </span>
      </div>
      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(listing.id)}
          className="flex-1 bg-gray-100 text-gray-700 rounded-full py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
        >
          <Edit3 className="w-3 h-3" />
          <span className="hidden sm:inline">Edit</span>
        </button>
        <button
          onClick={() => onDelete(listing.id)}
          className="bg-red-100 text-red-600 rounded-full py-1.5 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm font-medium hover:bg-red-200 transition-colors flex items-center justify-center"
        >
          <Trash2 className="w-3 h-3" />
          <span className="hidden sm:inline ml-1">Delete</span>
        </button>
      </div>
    </div>
  </div>
);

export default ListingsGridItem;
