"use client";
import { useState } from "react";
import Logo from "../svg/Logo";
import { ShoppingCart, Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <Menu className="block h-6 w-6 text-brown" />
              </button>
            </div>
            <div className="flex items-center">
              <Logo></Logo>
            </div>
            <div className="flex items-center">
              <ShoppingCart></ShoppingCart>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Navigation Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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

        {/* Navigation items */}
        <nav className="mt-4">
          <div className="px-4 space-y-2">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Products
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
