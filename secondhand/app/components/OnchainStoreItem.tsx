import type { Product } from "../types";
import Image from "next/image";
import QuantityInput from "./QuantityInput";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";
import { Check } from "lucide-react";

export default function OnchainStoreItem({ id, name, price, image }: Product) {
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const isInCart = cartItems.some((item) => item.id === id);

  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col w-full max-w-xs mx-auto p-0 overflow-hidden border border-gray-100">
      <div className="relative w-full h-48 bg-gray-50">
        <Image
          src={image}
          alt="Product image"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col px-4 py-3 grow">
        <h2 className="font-wix text-sm mb-2 line-clamp-2">{name}</h2>
        <div className="flex items-center justify-between mb-2">
          <p className="font-wix font-bold text-auto text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
        {isInCart ? (
          <button
            onClick={() => {
              removeItem(id);
              console.log("Item removed from cart:", id);
            }}
            className="mt-auto w-full py-2 rounded-xl bg-[#fdefe4] text-brown font-medium text-sm shadow-md flex items-center justify-center space-x-2"
          >
            <Check className="w-5 h-5 mr-2" />
            <span>In Cart</span>
          </button>
        ) : (
          <Link
            href={`/item/${id}`}
            className="mt-auto w-full py-2 rounded-xl bg-brown text-white font-medium text-sm shadow-md transition hover:bg-brown-700 text-center block flex items-center justify-center"
          >
            More Details
          </Link>
        )}
      </div>
    </div>
  );
}
