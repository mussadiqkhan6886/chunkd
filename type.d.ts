interface CookieType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  releaseDate?: string; // API returns Date as ISO string
  endDate?: string;
  durationDays?: number;
  soldOut: boolean;
  hotSeller: boolean;
  allergens: string[];
  storage: string;
  heating: string;
  totalLimit?: number | null;
  soldCount: number;
  active: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  allowedForBox:boolean
}

interface DropType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string; // usually for drops it's "limited"
  images: string[];
  allergens: string[];
  storage: string;
  heating: string;
  releaseDate: string; // ISO string
  endDate: string;     // ISO string
  durationDays: number;
  soldOut: boolean;
  hotSeller: boolean;
  active: boolean;
  totalLimit: number;
  soldCount: number;
  allowedForBox:boolean
  createdAt: string;   // ISO string
  updatedAt: string;   // ISO string
  __v?: number;        // mongoose version key, optional
}

interface CartItem {
  id: string;

  type: "simple" | "drop" | "box"; // ⭐ distinguishes 3 product types

  title: string;
  images: string;

  price: number; // dynamic for box
  quantity: number;

  // Only for limited drops
  totalLimit?: number;
  isLive?: boolean;
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


interface reviewType {
  _id: string
  name: string
  rating: number
  message: string
  approved: boolean
}

interface CouponType {
code: string 
createdAt: string
discount: number
__v: number
_id: string
}

import { ObjectId } from "mongodb";

type OrderStatus = "pending" | "paid" | "cancelled" | "refunded";

type OrderDoc = {
  _id?: ObjectId;
  items: CartItem[];
  couponCode?: string | null;
  status: OrderStatus;
  createdAt: Date;
  paidAt?: Date | null;
  stripeSessionId?: string | null;
  stripePaymentIntent?: string | null;
  amount: number; // total in display units (not cents)
  customerId?: ObjectId | null;
  stripeSession?: any;
};

type CustomerDetailsDoc = {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  createdAt: Date;
};


interface OrderDataType {
  cart: CartItem[]
  totalAmount: number
  city: string
  date: string
  orderType: string
  time: string
}

interface MediaType {
  _id: string
  media: string
  mediaType: string
  height: number
}