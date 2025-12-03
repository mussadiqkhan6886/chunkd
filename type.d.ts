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


interface reviewType {
  _id: string
  name: string
  rating: number
  message: string
}