import { notFound } from "next/navigation";
import { products } from "../../data/products";
import Image from "next/image";
import { Heart, ShoppingCart, MessageCircle, Star, MapPin } from "lucide-react";
import Navbar from "../../components/Navbar";

export default async function ItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await Promise.resolve(params);
  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <Navbar />
      <div className="pt-[640px] pb-24">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Product Image and Shipping Info */}
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
        <div className="px-4 pt-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {product.name}
          </h2>
          <p className="text-2xl font-bold text-gray-900 mb-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
        {/* Description */}
        <div className="px-4 mb-4">
          <h3 className="text-lg font-bold mb-1">Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {product.description}{" "}
            <span className="text-red-500 cursor-pointer">Read More</span>
          </p>
        </div>
        {/* More Details, Deal Method, About Seller */}
        <div className="px-4">
          {/* More Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">More Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Condition</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  {product.condition}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age Range</span>
                <span className="text-gray-900">{product.ageRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Brand</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {product.brand}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cleaning Status</span>
                <div className="flex space-x-2">
                  {product.cleaningStatus.washed && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Washed
                    </span>
                  )}
                  {product.cleaningStatus.sanitised && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Sanitised
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Size/Dimensions</span>
                <span className="text-gray-900">{product.dimensions}</span>
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
      <div className="fixed bottom-0 left-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-1 text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
            <Heart className="w-5 h-5" />
            <span>{product?.likes}</span>
          </button>
          <button className="font-wix flex-1 bg-brown text-white py-3 px-6 rounded-lg">
            Make Offer
          </button>
          <button className="font-wix flex-1 bg-brown text-white py-3 px-6 rounded-lg">
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}
