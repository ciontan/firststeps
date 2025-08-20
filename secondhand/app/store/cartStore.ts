import { create } from "zustand";
import { fetchProductByIdFromFirestore } from "../services/firebaseService";
import type { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
  status: "successful" | "pending" | "rejected";
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: string) => Promise<void>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateStatus: (id: string, status: CartItem["status"]) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: async (productId: string) => {
    try {
      const product = await fetchProductByIdFromFirestore(productId);
      if (!product) {
        console.error("Product not found");
        return;
      }

      set((state) => {
        const existingItem = state.items.find((i) => i.id === productId);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === productId ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          };
        }
        return {
          items: [
            ...state.items,
            { ...product, quantity: 1, status: "pending" },
          ],
        };
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  },

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    })),

  clearCart: () => set({ items: [] }),
}));
