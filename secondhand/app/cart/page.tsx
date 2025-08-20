"use client";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Cart } from "../svg/Cart";

interface CartItem extends Product {
  quantity: number;
  status: "successful" | "pending" | "rejected";
}

const TAB_LIST = [
  { key: "successful", label: "Successful" },
  { key: "pending", label: "Pending" },
  { key: "rejected", label: "Rejected" },
];

export default function ShoppingCartHeader() {
  const cartItems = useCartStore((state) => state.items) as CartItem[];
  const [activeTab, setActiveTab] = useState("successful");

  // Filter items by status
  const filteredItems = cartItems.filter((item) => item.status === activeTab);

  // Count items per tab
  const tabCounts = TAB_LIST.reduce(
    (acc, tab) => {
      acc[tab.key] = cartItems.filter((item) => item.status === tab.key).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="min-h-screen min-w-screen bg-white">
      <Navbar
        centerContent={
          <h1 className="text-lg font-bold font-wix text-brown">
            Shopping Cart ({cartItems.length})
          </h1>
        }
      />
      <div className="pt-20 px-4 max-w-4xl mx-auto">
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-2">
          {TAB_LIST.map((tab) => (
            <button
              key={tab.key}
              className={`flex flex-row items-center gap-2 py-2 px-2 sm:px-4 font-wix text-base sm:text-lg transition-colors
                  ${activeTab === tab.key ? "text-brown border-b-2 border-brown" : "text-gray-400"}
                `}
              onClick={() => setActiveTab(tab.key)}
              style={{ minWidth: "80px" }}
            >
              <span className="text-base">{tab.label}</span>
              <span
                className={`text-lg font-wix ${activeTab === tab.key ? "text-brown" : "text-gray-400"}`}
              >
                ({tabCounts[tab.key]})
              </span>
            </button>
          ))}
        </div>

        {/* Empty State or Cart Items */}
        <div className="space-y-3 mt-6">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <Cart className="w-16 h-16 text-brown mb-6" />
              <h2 className="text-lg sm:text-xl font-bold text-brown mb-2 text-center">
                Add an item to your cart
              </h2>
              <p className="text-gray-500 mb-8 text-center">
                Help reduce waste!
              </p>
              <Link
                href="/"
                className="bg-brown text-white rounded-full px-8 py-3 font-bold text-lg hover:bg-opacity-90 transition-colors"
              >
                Marketplace
              </Link>
            </div>
          ) : (
            <div className="space-y-3 pb-32">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-[#FFF7F3] rounded-2xl p-3 gap-4"
                >
                  <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 flex-shrink-0">
                    <img
                      src={item.image.toString()}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 items-center text-xs sm:text-sm text-gray-600 mt-1">
                      <span>{item.brand}</span>
                      {item.condition && (
                        <>
                          <span>•</span>
                          <span>{item.condition}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-semibold text-brown">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-sm text-gray-500">
                            × {item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="p-2 text-brown hover:text-brown/80 self-start"
                    onClick={() => useCartStore.getState().removeItem(item.id)}
                    aria-label="Remove"
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
              ))}
            </div>
          )}
        </div>

        {/* Checkout Bar - Only show when there are items */}
        {filteredItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-4 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-brown text-lg sm:text-xl">
                  $
                  {filteredItems
                    .reduce(
                      (sum, item) => sum + item.price * (item.quantity || 1),
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                <button className="flex-1 sm:flex-none bg-brown text-white rounded-full px-8 py-3 font-bold text-base">
                  Check out
                </button>
                <button
                  className="flex-1 sm:flex-none bg-gray-400 text-white rounded-full px-8 py-3 font-bold text-base flex flex-col items-center justify-center"
                  disabled
                >
                  <span>Chat</span>
                  <span className="text-[11px] text-white/70">
                    Working on it
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
