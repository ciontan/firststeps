import React, { useState, useEffect } from "react";
import BabyEssentials from "../svg/Categories/Essentials";
import Clothes from "../svg/Categories/Clothes";
import Toys from "../svg/Categories/Toys";
import Furniture from "../svg/Categories/Furniture";
import Learning from "../svg/Categories/Learning";
import Sports from "../svg/Categories/Sports";
import All from "../svg/Categories/All";
import useOnchainStoreContext from "./OnchainStoreProvider";

const categories = [
  { id: "all", name: "All", icon: All },
  { id: "baby", name: "Baby Essentials", icon: BabyEssentials },
  { id: "clothes", name: "Clothes", icon: Clothes },
  { id: "toys", name: "Toys", icon: Toys },
  { id: "furniture", name: "Furniture", icon: Furniture },
  { id: "learning", name: "Learning", icon: Learning },
  { id: "sports", name: "Sports", icon: Sports },
];

export type CategoryType = (typeof categories)[number]["id"];

interface CategoryTabsProps {
  onCategoryChange?: (category: CategoryType) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange }) => {
  const { selectedCategory, onCategoryChange: contextCategoryChange } =
    useOnchainStoreContext();
  const [activeCategory, setActiveCategory] = useState<CategoryType>(
    (selectedCategory as CategoryType) || "all",
  );

  // Update local state when context changes
  useEffect(() => {
    setActiveCategory((selectedCategory as CategoryType) || "all");
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId: CategoryType) => {
    setActiveCategory(categoryId);
    // Use the context function to update the global state
    contextCategoryChange(categoryId);
    // Also call the prop function if provided (for backward compatibility)
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="w-full bg-white mb-6 relative">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex justify-start items-center pt-4 px-5 space-x-10 max-w-5xl mx-auto min-w-max">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id as CategoryType)}
                className="flex items-center relative pb-4"
              >
                <div className="flex items-center space-x-2">
                  <Icon
                    className={`w-8 h-8 text-brown${isActive ? "" : " opacity-50"}`}
                  />
                  <span
                    className={`text-sm font-wix ${
                      isActive ? "text-brown font-medium" : "text-gray-400"
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brown z-10" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
    </div>
  );
};

export default CategoryTabs;
