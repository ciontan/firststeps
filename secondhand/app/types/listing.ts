export interface UserListing {
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

export type ListingStatus = "all" | "active" | "sold" | "draft" | "pending";

export interface AddListingModalProps {
  onClose: () => void;
  onAdd: (listing: UserListing) => void;
}

export const CONDITIONS = ["New", "Like New", "Good", "Fair", "Poor"] as const;
export const CLEANING_STATUSES = ["Not washed", "Washed", "Sanitized"] as const;
export const CATEGORIES = [
  "Baby Essentials",
  "Clothes",
  "Toys",
  "Furniture",
  "Learning",
  "Sports",
] as const;

export const STATUS_COLORS = {
  active: "bg-green-100 text-green-800",
  sold: "bg-gray-100 text-gray-600",
  draft: "bg-yellow-100 text-yellow-800",
  pending: "bg-blue-100 text-blue-800",
} as const;

export const STATUS_LABELS = {
  active: "Active",
  sold: "Sold",
  draft: "Draft",
  pending: "Pending",
} as const;
