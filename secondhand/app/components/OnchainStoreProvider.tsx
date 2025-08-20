import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { OnchainStoreContextType } from "../types";
import type { Product } from "../types";
import { fetchProductsFromFirestore } from "../services/firebaseService";

const emptyContext = {} as OnchainStoreContextType;

const OnchainStoreContext =
  createContext<OnchainStoreContextType>(emptyContext);

type OnchainStoreProviderReact = {
  children: ReactNode;
};

export function OnchainStoreProvider({ children }: OnchainStoreProviderReact) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Fetch products from Firestore on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const firestoreProducts = await fetchProductsFromFirestore();
        setProducts(firestoreProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
      const product = products.find((p) => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    }
    return total;
  }, [cart, products]);

  return (
    <OnchainStoreContext.Provider
      value={{
        products,
        quantities: cart,
        isOpen,
        setIsOpen,
        isInCart,
        addToCart,
        removeFromCart,
        amount,
        loading,
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

/*import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { OnchainStoreContextType } from "../types";
import type { Product } from "../types";
import { products } from "../data/products";

const emptyContext = {} as OnchainStoreContextType;

const OnchainStoreContext =
  createContext<OnchainStoreContextType>(emptyContext);

type OnchainStoreProviderReact = {
  children: ReactNode;
};

export function OnchainStoreProvider({ children }: OnchainStoreProviderReact) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      const product = products.find((p) => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    }
    return total;
  }, [cart]);

  return (
    <OnchainStoreContext.Provider
      value={{
        products,
        quantities: cart,
        isOpen,
        setIsOpen,
        isInCart,
        addToCart,
        removeFromCart,
        amount,
      }}
    >
      {children}
    </OnchainStoreContext.Provider>
  );
}

export default function useOnchainStoreContext() {
  const context = useContext(OnchainStoreContext);

  if (!context) {
    throw new Error("Please wrap your app with OnchainStoreProvider");
  }

  return context;
}
*/
