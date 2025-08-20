"use client";

import { notFound } from "next/navigation";
import { products } from "../../data/products";
import Image from "next/image";
import { ShoppingCart, Star, MapPin, Check } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(product.likes);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const getTruncatedDescription = (desc: string) => {
    const words = desc.split(" ");
    if (words.length <= 30) return desc;
    return words.slice(0, 30).join(" ") + "...";
  };

  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  // Check if this product is in the cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      <Navbar />
      {typeof window !== "undefined" &&
        document.querySelector(
          ".fixed.inset-0.bg-black.bg-opacity-50.z-50",
        ) && <div className="fixed inset-0 z-[60] bg-black bg-opacity-50" />}
      <div className="pt-[550px] pb-20">
        <div className="bg-white shadow-sm overflow-hidden">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "402 / 402" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Product Title and Price */}
        <div className="px-4 py-4">
          <h2 className="font-wix text-lg font-semibold mb-1">
            {product.name}
          </h2>
          <p className="font-wix text-lg">${product.price.toFixed(2)}</p>
        </div>
        {/* Description */}
        <div className="px-4 mb-4">
          <h3 className="font-wix text-[16px] font-bold mb-1">Description</h3>
          <p className="font-wix text-[16px]">
            {showFullDescription ? (
              product.description
            ) : (
              <>
                <span>{getTruncatedDescription(product.description)}</span>
                <span
                  className="font-wix font-semibold text-brown cursor-pointer inline"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => setShowFullDescription(true)}
                >
                  {" "}
                  Read More
                </span>
              </>
            )}
          </p>
        </div>
        {/* More Details, Deal Method, About Seller */}
        <div className="px-4">
          {/* More Details */}
          <div className="mb-6">
            <h3 className="font-wix text-[16px] font-bold text-black">
              More Details
            </h3>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8">
              {/* Left Column */}
              <div className="space-y-3">
                <div>
                  <div className="font-wix text-[16px] text-brown mb-1">
                    Condition
                  </div>
                  <div className="inline-block bg-[#FFEFE3] text-brown px-3 py-1.5 rounded-full text-xs font-wix font-normal">
                    {product.condition}
                  </div>
                </div>
                <div>
                  <div className="font-wix text-[16px] text-brown mb-1">
                    Brand
                  </div>
                  <div className="inline-block bg-[#FFEFE3] text-brown px-3 py-1.5 rounded-full text-xs font-wix font-normal">
                    {product.brand}
                  </div>
                </div>
                <div>
                  <div className="font-wix text-[16px] text-brown mb-1">
                    Size/Dimensions
                  </div>
                  <div className="inline-block bg-[#FFEFE3] text-brown px-3 py-1.5 rounded-full text-xs font-wix font-normal">
                    {product.dimensions}
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-3">
                <div>
                  <div className="font-wix text-md text-brown mb-1">
                    Age Range
                  </div>
                  <div className="inline-block bg-[#FFEFE3] text-brown px-3 py-1.5 rounded-full text-xs font-wix font-normal">
                    {product.ageRange}
                  </div>
                </div>
                <div>
                  <div className="font-wix text-md text-brown mb-1">
                    Cleaning Status
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.cleaningStatus.washed && (
                      <span className="inline-block bg-[#FFEFE3] text-brown px-3 py-1.5 rounded-full text-xs font-wix font-normal">
                        Washed
                      </span>
                    )}
                    {product.cleaningStatus.sanitised && (
                      <span className="inline-block bg-[#FFEFE3] text-brown px-3 py-1.5 rounded-full text-xs font-wix font-normal">
                        Sanitised
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Deal Method */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Deal Method</h3>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">{product.dealMethod}</span>
            </div>
          </div>
          {/* About Seller */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">About this seller</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">📦</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {product.seller.name}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {product.seller.rating} · {product.seller.reviews} reviews
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= product.seller.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 p-4 z-[60]">
        <div className="flex items-center space-x-3">
          <button
            className={`flex items-center space-x-1 px-4 py-3 rounded-lg ${liked ? "text-brown" : "text-gray-600"}`}
            onClick={() => {
              if (!liked) {
                setLikes(likes + 1);
                setLiked(true);
              } else {
                setLikes(likes - 1);
                setLiked(false);
              }
            }}
          >
            <ShoppingCart
              className="w-5 h-5"
              fill={liked ? "#601816" : "none"}
            />
            <span>{likes}</span>
          </button>
          {isInCart ? (
            <button
              onClick={() => {
                removeItem(product.id);
                console.log("Item removed from cart:", product.id);
              }}
              className="font-wix flex-1 bg-[#fdefe4] text-brown py-3 px-6 rounded-lg flex items-center justify-center space-x-2"
            >
              <Check className="w-5 h-5 mr-2" />
              <span>In Cart</span>
            </button>
          ) : (
            <button
              onClick={() => {
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                });
                const cartItems = useCartStore.getState().items;
                console.log("Item added to cart:", cartItems);
              }}
              className="font-wix flex-1 bg-brown text-white py-3 px-6 rounded-lg"
            >
              Make Offer
            </button>
          )}
          <button
            className="font-wix flex-1 bg-gray-400 text-white py-1 px-6 rounded-lg flex flex-col items-center justify-center"
            disabled
          >
            <span>Chat</span>
            <span className="text-[11px] text-white/70">Working on it</span>
          </button>
        </div>
      </div>
    </div>
  );
}
