"use client";
import { useState } from "react";
import { ShoppingCart, Menu, ChevronDown, ChevronUp } from "lucide-react";
import { About } from "../svg/About";
import { useCartStore } from "../store/cartStore";
import { Vision } from "../svg/Vision";
import { Values } from "../svg/Values";
import { Successful } from "../svg/Successful";
import { Pending } from "../svg/Pending";
import { Rejected } from "../svg/Rejected";
import { Listing } from "../svg/Listing";
import { Cart } from "../svg/Cart";
import Link from "next/link";
import All from "../svg/Categories/All";

export default function ShoppingCartHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);

  // Section expand/collapse state
  const [profileOpen, setProfileOpen] = useState(true);
  const [cartOpen, setCartOpen] = useState(true);
  const [homeOpen, setHomeOpen] = useState(true);
  const [exploreOpen, setExploreOpen] = useState(true);

  // SVG imports
  const Icons = {
    Essentials: require("../svg/Categories/Essentials").default,
    Clothes: require("../svg/Categories/Clothes").default,
    Toys: require("../svg/Categories/Toys").default,
    Furniture: require("../svg/Categories/Furniture").default,
    Learning: require("../svg/Categories/Learning").default,
    Sports: require("../svg/Categories/Sports").default,
    // Add other icons as needed
  };

  return (
    <>
      <nav className="fixed top-0 z-[55] w-full bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center rounded-md text-brown hover:text-brown hover:bg-[#FFEFE3] focus:outline-none"
              >
                <Menu className="block h-6 w-6 text-brown" />
              </button>
            </div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold font-wix text-brown">
                Shopping Cart ({cartItems.length})
              </h1>
            </div>
            <div className="flex items-center relative">
              <Link href="/cart">
                <div className="relative">
                  <ShoppingCart className="text-brown" />
                  {cartItems.length > 0 && (
                    <div
                      className="absolute bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      style={{
                        top: "-6px",
                        right: "-3px",
                        transform: "translate(50%,-50%)",
                        zIndex: 1,
                      }}
                    >
                      {cartItems.length}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Navigation Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[70] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold font-wix text-brown">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-brown hover:bg-[#FFEFE3]"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        {/* Navigation items - custom layout */}
        <nav className="mt-4 px-8 font-wix text-brown">
          {/* Home Section */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => setHomeOpen(!homeOpen)}
            >
              <span className="text-xl font-bold font-wix">Home</span>
              {homeOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            {homeOpen && (
              <div className="space-y-2 ml-1">
                <div className="font-wix flex items-center gap-2 text-md">
                  <About className="w-6 h-6" />
                  About us
                </div>
                <div className="font-wix flex items-center gap-2 text-md">
                  <Vision className="w-6 h-6" />
                  Our Vision
                </div>
                <div className="font-wix flex items-center gap-2 text-md">
                  <Values className="w-6 h-6" />
                  Our Values
                </div>
              </div>
            )}
          </div>
          {/* Explore Section */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => setExploreOpen(!exploreOpen)}
            >
              <span className="text-xl font-bold font-wix">Explore</span>
              {exploreOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            {exploreOpen && (
              <div className="space-y-2 ml-1">
                <div className="flex items-center gap-2 font-wix text-md">
                  <All className="w-6 h-6" />
                  All
                </div>
                <div className="flex items-center gap-2 font-wix text-md">
                  <Icons.Essentials className="w-6 h-6" />
                  Baby Essentials
                </div>
                <div className="flex items-center gap-2 font-wix text-md">
                  <Icons.Clothes className="w-6 h-6" />
                  Clothes
                </div>
                <div className="flex items-center gap-2 font-wix text-md">
                  <Icons.Toys className="w-6 h-6" />
                  Toys
                </div>
                <div className="flex items-center gap-2 font-wix text-md">
                  <Icons.Furniture className="w-6 h-6" />
                  Furniture
                </div>
                <div className="flex items-center gap-2 font-wix text-md">
                  <Icons.Learning className="w-6 h-6" />
                  Learning
                </div>
                <div className="flex items-center gap-2 font-wix text-md">
                  <Icons.Sports className="w-6 h-6" />
                  Sports
                </div>
              </div>
            )}
          </div>
          {/* Profile Section */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span className="text-xl font-wix font-bold">Your Profile</span>
              {profileOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            {profileOpen && (
              <div className="space-y-2 ml-1">
                <div className="flex items-center gap-2 text-md font-wix">
                  <Listing className="w-6 h-6" />
                  Listings
                </div>
              </div>
            )}
          </div>
          {/* Cart Section */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <span className="text-xl font-wix font-bold">Your Cart</span>
              {cartOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            {cartOpen && (
              <div className="space-y-2 ml-1">
                <div className="flex items-center gap-2 text-md font-wix">
                  <Successful className="w-6 h-6" />
                  Successful
                </div>
                <div className="flex items-center gap-2 text-md font-wix">
                  <Pending className="w-6 h-6" />
                  Pending
                </div>
                <div className="flex items-center gap-2 text-md font-wix">
                  <Rejected className="w-6 h-6" />
                  Rejected
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}