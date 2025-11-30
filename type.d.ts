interface CookieType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: "classic" | "limited";
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
}
