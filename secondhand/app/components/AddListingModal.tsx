import React, { useState } from "react";
import { uploadImageToStorage, saveProductToFirestore } from "../services/firebaseService";

interface AddListingModalProps {
  onClose: () => void;
  onAdd: (listing: any) => void | Promise<void>;
}

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
const cleaningStatuses = ["Not washed", "Washed", "Sanitized"];
const categories = [
  "Baby essentials",
  "Clothes",
  "Toys",
  "Furniture",
  "Learning",
  "Sports",
];

const AddListingModal: React.FC<AddListingModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    condition: "New",
    category: "Baby essentials",
    description: "",
    image: "",
    startAge: "",
    endAge: "",
    cleaningStatus: "Not washed",
    dealMethod: "",
    dimensions: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      setImageFile(file);
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
    const fileInput = document.getElementById("takePhotoInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    const fileInput2 = document.getElementById("uploadImageInput") as HTMLInputElement;
    if (fileInput2) fileInput2.value = "";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Item name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.startAge) newErrors.startAge = "Start age is required";
    if (!formData.endAge) newErrors.endAge = "End age is required";
    if (!formData.dealMethod.trim()) newErrors.dealMethod = "Deal method is required";
    if (!formData.dimensions.trim()) newErrors.dimensions = "Dimensions are required";
    if (formData.startAge && formData.endAge) {
      const start = parseInt(formData.startAge);
      const end = parseInt(formData.endAge);
      if (start >= end) {
        newErrors.endAge = "End age must be greater than start age";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    
    setIsSubmitting(true);
    try {
      let imageUrl = "";

      // Upload image to Firebase Storage if provided
      if (imageFile) {
        console.log("Uploading image to Firebase Storage...");
        try {
          const imagePath = `listings/${Date.now()}_${imageFile.name}`;
          imageUrl = await uploadImageToStorage(imageFile, imagePath);
          console.log("Image uploaded successfully:", imageUrl);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          // Fall back to base64 or continue without image based on your preference
          alert("Image upload failed. The listing will be created without an image.");
          // Optionally use base64: imageUrl = await uploadImageAsBase64(imageFile);
        }
      }

      // Prepare product data for Firebase
      const productData = {
        name: formData.name,
        brand: formData.brand,
        price: parseFloat(formData.price),
        condition: formData.condition,
        category: formData.category,
        description: formData.description,
        image: imageUrl,
        ageRange: {
          startAge: parseInt(formData.startAge) || 0,
          endAge: parseInt(formData.endAge) || 0,
        },
        cleaningStatus: formData.cleaningStatus,
        dealMethod: formData.dealMethod,
        dimensions: formData.dimensions,
        seller: {
          name: "Current User", // You might want to get this from auth context
          avatar: "",
          rating: 0,
          review: 0,
        },
        status: "pending",
      };

      console.log("Saving product to Firestore...");
      // Save to Firebase Firestore
      const productId = await saveProductToFirestore(productData);
      console.log("Product saved successfully with ID:", productId);

      // Create the listing object to pass to onAdd callback
      const newListing = {
        id: productId,
        ...productData,
        views: 0,
        likes: 0,
        createdAt: new Date().toISOString().split("T")[0],
        seller: {
          ...productData.seller,
          likes: 0,
        },
      };

      // Call the onAdd callback
      await onAdd(newListing);

      // Reset form
      setFormData({
        name: "",
        brand: "",
        price: "",
        condition: "New",
        category: "Baby essentials",
        description: "",
        image: "",
        startAge: "",
        endAge: "",
        cleaningStatus: "Not washed",
        dealMethod: "",
        dimensions: "",
      });
      setImageFile(null);
      setImagePreview("");
      setErrors({});
      
      alert("Product listing created successfully!");
      onClose(); // Close the modal after successful submission
      
    } catch (error) {
      console.error("Error creating listing:", error);
      alert(`Failed to create listing: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] sm:max-h-[70vh] mt-8 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold font-wix text-brown">Add New Listing</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base ${errors.name ? "border-red-500" : "border-gray-300"}`}
              placeholder="e.g., Baby Stroller"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => {
                setFormData({ ...formData, brand: e.target.value });
                if (errors.brand) setErrors({ ...errors, brand: "" });
              }}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base ${errors.brand ? "border-red-500" : "border-gray-300"}`}
              placeholder="e.g., Chicco"
            />
            {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
          </div>

          {/* Price and Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                  if (errors.price) setErrors({ ...errors, price: "" });
                }}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base ${errors.price ? "border-red-500" : "border-gray-300"}`}
                placeholder="25.00"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition *</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
              >
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Suitable Age Range (months) *</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From (months)</label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  required
                  value={formData.startAge}
                  onChange={(e) => {
                    setFormData({ ...formData, startAge: e.target.value });
                    if (errors.startAge) setErrors({ ...errors, startAge: "" });
                  }}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base ${errors.startAge ? "border-red-500" : "border-gray-300"}`}
                  placeholder="0"
                />
                {errors.startAge && <p className="text-red-500 text-xs mt-1">{errors.startAge}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To (months)</label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  required
                  value={formData.endAge}
                  onChange={(e) => {
                    setFormData({ ...formData, endAge: e.target.value });
                    if (errors.endAge) setErrors({ ...errors, endAge: "" });
                  }}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base ${errors.endAge ? "border-red-500" : "border-gray-300"}`}
                  placeholder="36"
                />
                {errors.endAge && <p className="text-red-500 text-xs mt-1">{errors.endAge}</p>}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Enter the age range in months (e.g., 0-6 months, 12-24 months)</p>
          </div>

          {/* Cleaning Status and Deal Method */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cleaning Status *</label>
              <select
                value={formData.cleaningStatus}
                onChange={(e) => setFormData({ ...formData, cleaningStatus: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base"
              >
                {cleaningStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deal Method *</label>
              <input
                type="text"
                required
                value={formData.dealMethod}
                onChange={(e) => {
                  setFormData({ ...formData, dealMethod: e.target.value });
                  if (errors.dealMethod) setErrors({ ...errors, dealMethod: "" });
                }}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base ${errors.dealMethod ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., Collect from Waterway Point MRT"
              />
              {errors.dealMethod && <p className="text-red-500 text-xs mt-1">{errors.dealMethod}</p>}
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions *</label>
            <input
              type="text"
              required
              value={formData.dimensions}
              onChange={(e) => {
                setFormData({ ...formData, dimensions: e.target.value });
                if (errors.dimensions) setErrors({ ...errors, dimensions: "" });
              }}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown text-sm sm:text-base ${errors.dimensions ? "border-red-500" : "border-gray-300"}`}
              placeholder="e.g., 30cm x 20cm x 15cm"
            />
            {errors.dimensions && <p className="text-red-500 text-xs mt-1">{errors.dimensions}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown resize-none text-sm sm:text-base"
              placeholder="Describe your item's condition, age, included accessories..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photos *</label>
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
                  className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-50"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center flex flex-col gap-3 items-center">
                <input
                  id="takePhotoInput"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  id="uploadImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="inline-block bg-gray-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11a4 4 0 118 0 4 4 0 01-8 0z" />
                  </svg>
                </span>
                <span className="font-semibold text-lg text-gray-700">Add Photos</span>
                <span className="text-sm text-gray-500">Take a photo or choose from your gallery to show your item</span>
                <button
                  type="button"
                  className="w-full sm:w-auto bg-brown text-white rounded-full px-4 py-2 font-bold mb-2"
                  onClick={() => document.getElementById('takePhotoInput')?.click()}
                >
                  Take Photo
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto bg-gray-100 text-brown rounded-full px-4 py-2 font-bold"
                  onClick={() => document.getElementById('uploadImageInput')?.click()}
                >
                  Choose from Gallery
                </button>
                <div className="mt-3 text-xs text-gray-500">Max file size: 5MB &bull; Formats: JPG, PNG, WEBP</div>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:flex-1 px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-full font-wix font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 px-6 py-2.5 sm:py-3 bg-brown text-white rounded-full font-wix font-bold hover:bg-opacity-90 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Listing..." : "Add Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingModal;