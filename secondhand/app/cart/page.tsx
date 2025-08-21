"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Cart } from "../svg/Cart";
import useCreateCharge from "../hooks/useCreateCharge";
import {
  Checkout,
  CheckoutButton,
  LifecycleStatus,
} from "@coinbase/onchainkit/checkout";
import OnchainStoreModal from "../components/OnchainStoreModal";

interface CartItem extends Product {
  quantity: number;
  status: "successful" | "pending" | "rejected";
}

const TAB_LIST = [
  { key: "successful", label: "Successful" },
  { key: "pending", label: "Pending" },
  { key: "rejected", label: "Rejected" },
];

// Status background colors mapping
const STATUS_BG_COLORS = {
  successful: "bg-[#FFF7F3]", // Current cream color
  pending: "bg-[#FBEEDF]", // Light orange/peach
  rejected: "bg-[#FFA9A9]", // Light red/pink
};

export default function ShoppingCartHeader() {
  const searchParams = useSearchParams();
  const cartItems = useCartStore((state) => state.items) as CartItem[];
  const [showModal, setShowModal] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(
    new Set(),
  );

  // Get tab from URL parameter, default to "successful"
  const tabFromUrl = searchParams.get("tab");
  const initialTab =
    TAB_LIST.find((tab) => tab.key === tabFromUrl)?.key || "successful";

  const [activeTab, setActiveTab] = useState(initialTab);

  // Update tab when URL parameter changes
  useEffect(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab && TAB_LIST.find((tab) => tab.key === urlTab)) {
      setActiveTab(urlTab);
    }
  }, [searchParams]);

  // Filter items by status
  const filteredItems = cartItems.filter((item) => item.status === activeTab);

  // Handle product selection (only for successful tab)
  const toggleProductSelection = useCallback(
    (productId: string) => {
      if (activeTab === "successful") {
        setSelectedProductIds((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(productId)) {
            newSet.delete(productId);
          } else {
            newSet.add(productId);
          }
          return newSet;
        });
      }
    },
    [activeTab],
  );

  // Reset selections when tab changes
  useEffect(() => {
    setSelectedProductIds(new Set());
  }, [activeTab]);

  // OnchainStoreCart logic - Convert cart items to quantities format (only selected products)
  const quantities = useMemo(() => {
    const result: Record<string, number> = {};
    if (activeTab === "successful") {
      filteredItems.forEach((item) => {
        if (selectedProductIds.has(item.id)) {
          result[item.id] = item.quantity || 1;
        }
      });
    }
    return result;
  }, [filteredItems, selectedProductIds, activeTab]);

  // Create products array for OnchainStoreCart logic
  const products = filteredItems.map((item) => ({
    ...item,
    image: typeof item.image === "string" ? item.image : item.image.toString(),
  }));

  // OnchainStoreCart total calculation
  const totalSum = useMemo(() => {
    return (
      products?.reduce(
        (sum, product) => sum + (quantities[product.id] || 0) * product.price,
        0,
      ) || 0
    );
  }, [products, quantities]);

  // OnchainStoreCart payment logic
  const { createCharge } = useCreateCharge();

  const handleStatusChange = useCallback((status: LifecycleStatus) => {
    console.log("onStatus", status);
  }, []);

  const chargeHandler = useCallback(() => {
    // Check minimum amount requirement
    if (totalSum < 0.001) {
      throw new Error("Minimum order amount is $0.001 USD");
    }

    const description = Object.keys(quantities)
      .map((productId) => {
        return `${productId}(${quantities[productId]})`;
      })
      .join(",");
    const chargeDetails = {
      name: "Secondhand Store Purchase",
      description,
      pricing_type: "fixed_price",
      local_price: {
        amount: totalSum.toFixed(2), // Ensure 2 decimal places
        currency: "USD",
      },
      redirect_url: window.location.href, // Add redirect URL
      cancel_url: window.location.href, // Add cancel URL
      metadata: {
        products: Object.keys(quantities).join(","),
      },
    };
    return createCharge(chargeDetails);
  }, [createCharge, quantities, totalSum]);

  const key = useMemo(() => {
    if (!quantities) return "";
    const productIds = Object.keys(quantities);
    const values = Object.values(quantities).flat();
    return `${productIds.join(".")}-${values.join(".")}`;
  }, [quantities]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

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
              {filteredItems.map((item) => {
                const isSelected =
                  activeTab === "successful" && selectedProductIds.has(item.id);
                const isClickable = activeTab === "successful";

                return (
                  <div
                    key={item.id}
                    className={`flex items-center rounded-2xl p-3 gap-4 transition-colors ${
                      isSelected
                        ? "bg-[#365541]" // Green when selected
                        : STATUS_BG_COLORS[item.status]
                    } ${isClickable ? "cursor-pointer hover:opacity-80" : ""}`}
                    onClick={() =>
                      isClickable && toggleProductSelection(item.id)
                    }
                  >
                    <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 flex-shrink-0">
                      <img
                        src={item.image.toString()}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm sm:text-base font-medium line-clamp-2 ${
                          isSelected ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <div
                        className={`flex flex-wrap gap-2 items-center text-xs sm:text-sm mt-1 ${
                          isSelected ? "text-gray-200" : "text-gray-600"
                        }`}
                      >
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
                          <span
                            className={`text-base sm:text-lg font-semibold ${
                              isSelected ? "text-white" : "text-brown"
                            }`}
                          >
                            ${item.price.toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <span
                              className={`text-sm ${
                                isSelected ? "text-gray-200" : "text-gray-500"
                              }`}
                            >
                              × {item.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      className={`p-2 self-start hover:opacity-80 ${
                        isSelected ? "text-white" : "text-brown"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering selection when clicking remove
                        useCartStore.getState().removeItem(item.id);
                      }}
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
                );
              })}
            </div>
          )}
        </div>

        {/* OnchainStoreCart - Only show when there are items AND successful tab is selected */}
        {filteredItems.length > 0 && activeTab === "successful" && (
          <div className="-mx-[50vw] fixed right-1/2 bottom-0 left-1/2 w-screen border-gray-200 border-t bg-[white]">
            {showModal && <OnchainStoreModal closeModal={closeModal} />}
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col items-start justify-between py-4 md:flex-row md:items-center">
                <div className="mb-2 hidden flex-col px-4 text-xs sm:flex md:mb-0 md:w-1/3 lg:px-6">
                  <span>Built with OnchainKit</span>
                  <a
                    href="https://www.coinbase.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-1 text-[8px] text-gray-600 hover:text-gray-900"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div className="flex w-full grow flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:gap-0 md:w-auto lg:px-6">
                  <h2 className="font-bold text-lg md:w-11/12">
                    TOTAL {totalSum.toFixed(2)} USDC
                  </h2>
                  <div className="w-64">
                    <Checkout
                      key={key}
                      onStatus={handleStatusChange}
                      chargeHandler={chargeHandler}
                    >
                      <CheckoutButton
                        coinbaseBranded={true}
                        text={
                          totalSum < 0.001
                            ? "Minimum $0.001"
                            : "Pay with Crypto"
                        }
                        disabled={!totalSum || totalSum < 0.001}
                      />
                    </Checkout>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
