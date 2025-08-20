import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { OnchainStoreContextType } from "../types.ts";
import type { Product } from "../types.ts";
import {
  fetchProductsFromFirestore,
  searchProducts,
  filterProductsByCategory,
} from "../services/firebaseService.tsx";

const emptyContext = {} as OnchainStoreContextType;

const OnchainStoreContext =
  createContext<OnchainStoreContextType>(emptyContext);

type OnchainStoreProviderReact = {
  children: ReactNode;
};

export function OnchainStoreProvider({ children }: OnchainStoreProviderReact) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch products from Firestore on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const firestoreProducts = await fetchProductsFromFirestore();
        setAllProducts(firestoreProducts);
        setFilteredProducts(firestoreProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Apply search and category filters
  useEffect(() => {
    let results = [...allProducts];

    // Apply category filter first
    results = filterProductsByCategory(results, selectedCategory);

    // Then apply search filter
    results = searchProducts(results, searchQuery);

    setFilteredProducts(results);
  }, [allProducts, searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const isInCart = useMemo(
    () => (productId: string) => Boolean(cart[productId]),
    [cart],
  );

  const addToCart = (productId: string) => {
    setCart((c) => ({
      ...c,
      [productId]: (c[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((c) => {
      const { [productId]: _, ...rest } = c;
      return rest;
    });
  };

  const amount = useMemo(() => {
    let total = 0;
    for (const [productId, quantity] of Object.entries(cart)) {
      const product = allProducts.find((p) => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    }
    return total;
  }, [cart, allProducts]);

  return (
    <OnchainStoreContext.Provider
      value={{
        products: filteredProducts,
        quantities: cart,
        isOpen,
        setIsOpen,
        isInCart,
        addToCart,
        removeFromCart,
        amount,
        loading,
        searchQuery,
        onSearch: handleSearch,
        selectedCategory,
        onCategoryChange: handleCategoryChange,
      }}
    >
      {children}
    </OnchainStoreContext.Provider>
  );
}

export default function useOnchainStoreContext() {
  const context = useContext(OnchainStoreContext);
  return context;
}
