"use client";

import { createContext, useContext, useEffect, useState } from "react";

// ------------------ TYPES ------------------

export interface CookieType {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: string;

  type: "simple" | "drop" | "box"; // ⭐ distinguishes 3 product types

  title: string;
  images: string[];

  price: number; // dynamic for box
  quantity: number;

  // Only for limited drops
  totalLimit?: number;

  // Only for build-a-box
  boxType?: {
    size: number; // 4 or 6
    boxTotalPrice: number; // calculated
    cookies: {
      id: string;
      title: string;
      image: string;
      qty: number;
      price: number;
    }[],
  };
}

type DropContextType = {
  now: Date;
  getStatus: (
    releaseDate: string,
    endDate: string,
    soldOut: boolean,
    active: boolean
  ) => string;
  getCountdown: (releaseDate: string) => string;

  cart: CartItem[];
  totalAmount: number;
  totalItems: number;

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
};

// ------------------ DEFAULT VALUE ------------------
const DropContext = createContext<DropContextType | null>(null);

// ------------------ PROVIDER ------------------
export const DropProvider = ({ children }: { children: React.ReactNode }) => {
  const [now, setNow] = useState(new Date());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // 🧮 Recalculate totals
  useEffect(() => {
    const amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(amount);
    setTotalItems(items);
  }, [cart]);

  // ---------------------------------------------------
  // 🔥 ADD TO CART — supports simple, drop, and box
  // ---------------------------------------------------
  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id && item.type === newItem.type
      );

      // If item exists → update quantity
      if (existing) {
        let updatedQuantity = existing.quantity + newItem.quantity;

        // Limit stock for DROP products
        if (existing.type === "drop" && existing.totalLimit) {
          updatedQuantity = Math.min(updatedQuantity, existing.totalLimit);
        }

        return prev.map((item) =>
          item.id === existing.id && item.type === existing.type
            ? { ...item, quantity: updatedQuantity }
            : item
        );
      }

      // If DROP: ensure incoming quantity does not exceed totalLimit
      if (newItem.type === "drop" && newItem.totalLimit) {
        return [
          ...prev,
          {
            ...newItem,
            quantity: Math.min(newItem.quantity, newItem.totalLimit),
          },
        ];
      }

      // Simple + Box items → add directly
      return [...prev, newItem];
    });
  };

  // ❌ Remove item
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔄 Update quantity (cannot be less than 1)
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // 🧹 CLEAR CART (fixed bug)
  const clearCart = () => setCart([]);

  // ⏱ Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ------------------ DROP STATUS LOGIC ------------------
  const getStatus = (
    releaseDate: string,
    endDate: string,
    soldOut: boolean,
    active: boolean
  ): string => {
    const release = new Date(releaseDate);
    const end = new Date(endDate);

    if (now < release) return "Coming Soon";
    if (now >= release && now < end && !soldOut && active) return "Live";
    return "Sold Out";
  };

  const getCountdown = (releaseDate: string): string => {
    const release = new Date(releaseDate);
    const diff = release.getTime() - now.getTime();

    if (diff <= 0) return "00 : 00 : 00 : 00";

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return `${d}d : ${h}h : ${m}m : ${s}s`;
  };

  return (
    <DropContext.Provider
      value={{
        now,
        getStatus,
        getCountdown,
        cart,
        totalAmount,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </DropContext.Provider>
  );
};

// ------------------ HOOK ------------------
export const useDrop = () => {
  const ctx = useContext(DropContext);
  if (!ctx) throw new Error("useDrop must be used within DropProvider");
  return ctx;
};
