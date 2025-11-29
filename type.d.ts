type CookieType = {
  id: number;
  slug: string;
  price: number;
  title: string;
  category: string;   // FIXED
  status: string; // Optional but useful
  hotSeller: boolean;
  description: string;

  releaseDate: string;
  durationDays: number;
  soldOut: boolean;

  allergens: string[];
  storage: string;
  heating: string;
};
