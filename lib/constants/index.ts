export const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Menu', ariaLabel: 'View our Menu', link: '/menu' },
    { label: 'Build Your Box', ariaLabel: 'Build your own box', link: '/build-box' },
    { label: 'Snack\'d', ariaLabel: 'Limited Drops', link: '/drops' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
    { label: 'Cart', ariaLabel: 'View Your Cart', link: '/cart' },
];

export const limitedCookieDrops = [
  {
    id: 1,
    name: "Choco Lava Burst",
    image: "/images/choco-lava-burst.png",
    description: "A premium double-baked cookie packed with Belgian dark chocolate. Only 200 boxes this drop.",
    startTime: "2025-12-01T12:00:00Z", // ISO format
    endTime: "2025-12-03T12:00:00Z",
  },
  {
    id: 2,
    name: "Salted Caramel Swirl",
    image: "/images/salted-caramel-swirl.png",
    description: "Sweet, salty, crunchy — the perfect balance. Baked fresh in small-batch limited runs.",
    startTime: "2025-11-28T12:00:00Z",
    endTime: "2025-11-29T12:00:00Z",
  },
  {
    id: 3,
    name: "Peanut Butter Crunch",
    image: "/images/peanut-butter-crunch.png",
    description: "A crunchy peanut butter cookie with chocolate chips. Limited to only 150 boxes.",
    startTime: "2025-11-20T12:00:00Z",
    endTime: "2025-11-22T12:00:00Z",
  },
];

// data/bestSellers.js
export const bestSellerCookies = [
  {
    id: 'cs-001',
    name: 'Choco Lava Burst',
    image: '/images/choco-lava-burst.png', // replace with actual path
    description: 'Double-baked Belgian dark chocolate cookie with a molten center — rich, gooey, and decadent.',
    price: 12.99,            // price per box (or per unit) in USD (change currency as needed)
    currency: 'USD',
    rating: 4.9,             // average rating (out of 5)
    reviews: 842,
    tags: ['chocolate', 'limited', 'bestseller', 'vegan-friendly'],
    inStock: true,
    stockLeft: 48,           // numeric stock indicator
    calories: 320,           // per serving
    ingredients: ['flour', 'sugar', 'butter', 'belgian dark chocolate', 'cocoa', 'egg', 'salt'],
    bestseller: true,
    createdAt: '2025-10-12T09:00:00Z'
  },
  {
    id: 'cs-0010',
    name: 'Choco Lava Burst',
    image: '/images/choco-lava-burst.png', // replace with actual path
    description: 'Double-baked Belgian dark chocolate cookie with a molten center — rich, gooey, and decadent.',
    price: 12.99,            // price per box (or per unit) in USD (change currency as needed)
    currency: 'USD',
    rating: 4.9,             // average rating (out of 5)
    reviews: 842,
    tags: ['chocolate', 'limited', 'bestseller', 'vegan-friendly'],
    inStock: true,
    stockLeft: 48,           // numeric stock indicator
    calories: 320,           // per serving
    ingredients: ['flour', 'sugar', 'butter', 'belgian dark chocolate', 'cocoa', 'egg', 'salt'],
    bestseller: true,
    createdAt: '2025-10-12T09:00:00Z'
  },
  {
    id: 'cs-005',
    name: 'Lemon Lava Burst',
    image: '/images/choco-lava-burst.png', // replace with actual path
    description: 'Double-baked Belgian dark chocolate cookie with a molten center — rich, gooey, and decadent.',
    price: 122.99,            // price per box (or per unit) in USD (change currency as needed)
    currency: 'USD',
    rating: 4.9,             // average rating (out of 5)
    reviews: 842,
    tags: ['chocolate', 'limited', 'bestseller', 'vegan-friendly'],
    inStock: true,
    stockLeft: 48,           // numeric stock indicator
    calories: 320,           // per serving
    ingredients: ['flour', 'sugar', 'butter', 'belgian dark chocolate', 'cocoa', 'egg', 'salt'],
    bestseller: true,
    createdAt: '2025-10-12T09:00:00Z'
  },
  {
    id: 'cs-002',
    name: 'Salted Caramel Swirl',
    image: '/images/salted-caramel-swirl.png',
    description: 'Buttery cookie with ribbons of salted caramel and a sprinkle of sea salt for the perfect sweet-salty hit.',
    price: 11.5,
    currency: 'USD',
    rating: 4.8,
    reviews: 610,
    tags: ['caramel', 'small-batch', 'bestseller'],
    inStock: true,
    stockLeft: 120,
    calories: 290,
    ingredients: ['flour', 'sugar', 'butter', 'caramel', 'sea salt', 'egg', 'vanilla'],
    bestseller: true,
    createdAt: '2025-09-22T09:00:00Z'
  }
];
