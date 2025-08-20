import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export type NavbarLinkReact = {
  link: string;
  label: string;
};

export enum CleaningStatus {
  Washed = "washed",
  Sanitised = "sanitised",
}

export enum Condition {
  BrandNew = "brand new",
  LikeNew = "like new",
  LightlyUsed = "lightly used",
  WellUsed = "well used",
  HeavilyUsed = "heavily used",
}

export interface AgeRange {
  start_age: number;
  end_age: number;
}

export enum Category {
  BabyEssentials = "Baby essentials",
  Clothes = "Clothes",
  Toys = "Toys",
  Furniture = "Furniture",
  Learning = "Learning",
  Sports = "Sports",
}

export interface Seller {
  name: string;
  rating: number;
  review: number;
  avatar: string;
  listings: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string | StaticImageData
  description: string;
  condition: Condition;
  ageRange: AgeRange;
  brand: string;
  cleaningStatus: CleaningStatus;
  dimensions: string;
  dealMethod: string;
  seller: Seller;
  likes: number;
  category: Category;
}

export type Quantities = Record<string, number>;

export type QuantityInputReact = {
  productId: string;
};

export type QuantityInputButtonReact = {
  onClick: () => void;
  svg: ReactNode;
  label: string;
};

export type OnchainStoreCartReact = {
  setShowModal?: (value: boolean) => void;
  showModal?: boolean;
};

export type OnchainStoreModalReact = {
  closeModal: () => void;
};

export type MockCheckoutButtonReact = {
  onClick: () => void;
};

export type ChargeDetails = {
  name?: string;
  description?: string;
  pricing_type?: string;
  local_price?: {
    amount: string;
    currency: string;
  };
};

export interface OnchainStoreContextType {
  products: Product[];
  quantities: Record<string, number>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isInCart: (productId: string) => boolean;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  amount: number;
  loading: boolean;
}


