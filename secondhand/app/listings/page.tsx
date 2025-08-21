"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { CategoryType } from "../components/CategoryTabs";
import { Plus, Edit3, Trash2, Eye, MoreHorizontal } from "lucide-react";
interface UserListing {
  id: string;
  name: string;
  brand: string;
  price: number;
  condition: string;
  category: string;
  image: string;
  description: string;
  status: "pending" | "active" | "sold" | "draft";
  createdAt: string;
  views: number;
  likes: number;
  ageRange: {
    startAge: number;
    endAge: number;
  };
  cleaningStatus: string;
  dealMethod: string;
  dimensions: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
    review: number;
    likes: number;
    listings: string[];
  };
}

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


export default function ListingsPage() {
  const [listings, setListings] = useState<UserListing[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "sold" | "draft" | "pending"
  >("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  // Filter listings based on active tab
  const filteredListings = listings.filter((listing) => {
    if (activeTab === "all") return true;
    return listing.status === activeTab;
  });

  // Count listings by status
  const counts = {
    all: listings.length,
    active: listings.filter((l) => l.status === "active").length,
    sold: listings.filter((l) => l.status === "sold").length,
    draft: listings.filter((l) => l.status === "draft").length,
    pending: listings.filter((l) => l.status === "pending").length,
  };

  const handleDeleteListing = (id: string) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id));
  };

  const handleEditListing = (id: string) => {
    // Navigate to edit form or open edit modal
    console.log("Edit listing:", id);
  };

    function onCategorySelect(category: CategoryType): void {
        console.log("Selected category:", category);
    }
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        centerContent={
          <h1 className="text-lg font-bold font-wix text-brown">My Listings</h1>
        }
        onCategorySelect={onCategorySelect}
      />

      <div className="pt-20 px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto">
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold font-wix text-brown">
            Your Items ({listings.length})
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-brown text-white rounded-full px-4 sm:px-6 py-2.5 sm:py-3 font-wix font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Listing</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {(["all", "active", "pending", "sold", "draft"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 rounded-full font-wix text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === tab
                    ? "bg-brown text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="hidden sm:inline">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab]})
                </span>
                <span className="sm:hidden">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ),
          )}
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
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
              onClick={() => setShowAddForm(true)}
              className="bg-brown text-white rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-wix font-bold text-sm sm:text-base"
            >
              Create Your First Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-8">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[listing.status]}`}
                    >
                      {STATUS_LABELS[listing.status]}
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
                    {listing.ageRange.startAge}-{listing.ageRange.endAge}
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
                        <span className="text-xs">{listing.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          />
                        </svg>
                        <span className="text-xs">{listing.likes}</span>
                      </div>
                    </div>
                    <span className="text-xs hidden sm:inline">
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs sm:hidden">
                      {new Date(listing.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditListing(listing.id)}
                      className="flex-1 bg-gray-100 text-gray-700 rounded-full py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteListing(listing.id)}
                      className="bg-red-100 text-red-600 rounded-full py-1.5 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm font-medium hover:bg-red-200 transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span className="hidden sm:inline ml-1">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Listing Modal */}
      {showAddForm && (
        <AddListingModal
          onClose={() => setShowAddForm(false)}
          onAdd={(newListing) => {
            setListings((prev) => [newListing, ...prev]);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
}

// Add Listing Modal Component
interface AddListingModalProps {
  onClose: () => void;
  onAdd: (listing: UserListing) => void;
}

function AddListingModal({ onClose, onAdd }: AddListingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    condition: "New",
    category: "Baby Essentials",
    description: "",
    image: "",
    // New Firebase fields
    startAge: "",
    endAge: "",
    cleaningStatus: "Not washed",
    dealMethod: "",
    dimensions: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
  const cleaningStatuses = ["Not washed", "Washed", "Sanitized"];
  const categories = [
    "Baby Essentials",
    "Clothes",
    "Toys",
    "Furniture",
    "Learning",
    "Sports",
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    // Reset file input
    const fileInput = document.getElementById(
      "imageUpload",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would upload the image to your storage service here
    // For now, we'll use the preview URL or a placeholder
    const imageUrl = imagePreview || "/api/placeholder/300/300";

    const newListing: UserListing = {
      id: Date.now().toString(),
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price),
      condition: formData.condition,
      category: formData.category,
      description: formData.description,
      image: imageUrl,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      views: 0,
      likes: 0,
      ageRange: {
        startAge: parseInt(formData.startAge) || 0,
        endAge: parseInt(formData.endAge) || 0,
      },
      cleaningStatus: formData.cleaningStatus,
      dealMethod: formData.dealMethod,
      dimensions: formData.dimensions,
      seller: {
        name: "Current User", // Replace with actual user data
        avatar: "",
        rating: 0,
        review: 0,
        likes: 0,
        listings: [],
      },
    };

    onAdd(newListing);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] sm:max-h-[70vh] mt-8 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold font-wix text-brown">
              Add New Listing
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
              placeholder="e.g., Baby Stroller"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand *
            </label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
              placeholder="e.g., Chicco"
            />
          </div>

          {/* Price and Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition *
              </label>
              <select
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
              >
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Age Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Age (months) *
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.startAge}
                onChange={(e) =>
                  setFormData({ ...formData, startAge: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Age (months) *
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.endAge}
                onChange={(e) =>
                  setFormData({ ...formData, endAge: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
                placeholder="36"
              />
            </div>
          </div>

          {/* Cleaning Status and Deal Method */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cleaning Status *
              </label>
              <select
                value={formData.cleaningStatus}
                onChange={(e) =>
                  setFormData({ ...formData, cleaningStatus: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
              >
                {cleaningStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deal Method *
              </label>
              <input
                type="text"
                required
                value={formData.dealMethod}
                onChange={(e) =>
                  setFormData({ ...formData, dealMethod: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
                placeholder="e.g., Collect from Waterway Point MRT"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dimensions *
            </label>
            <input
              type="text"
              required
              value={formData.dimensions}
              onChange={(e) =>
                setFormData({ ...formData, dimensions: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
              placeholder="e.g., 30cm x 20cm x 15cm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown resize-none text-sm sm:text-base"
              placeholder="Describe your item's condition, age, included accessories..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos *
            </label>

            {/* Image Preview or Upload Area */}
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="mt-2 flex gap-2">
                  <label className="flex-1 bg-gray-100 text-gray-700 rounded-xl py-2 px-4 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer text-center">
                    Change Photo
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Add Photos
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 max-w-xs">
                    Take a photo or choose from your gallery to show your item
                  </p>

                  {/* Mobile-First Upload Options */}
                  <div className="w-full space-y-2">
                    <label className="block w-full bg-brown text-white rounded-xl py-3 px-4 font-medium hover:bg-opacity-90 transition-colors cursor-pointer text-center">
                      Take Photo
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    <label className="block w-full bg-gray-100 text-gray-700 rounded-xl py-3 px-4 font-medium hover:bg-gray-200 transition-colors cursor-pointer text-center">
                      Choose from Gallery
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <p className="text-xs text-gray-400 mt-3">
                    Max file size: 5MB • Formats: JPG, PNG, WEBP
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-full font-wix font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 px-6 py-2.5 sm:py-3 bg-brown text-white rounded-full font-wix font-bold hover:bg-opacity-90 transition-colors text-sm sm:text-base"
            >
              Add Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
