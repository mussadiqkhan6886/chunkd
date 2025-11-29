import { LuPackage, LuCookie, LuTruck } from "react-icons/lu";

export const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Menu', ariaLabel: 'View our Menu', link: '/menu' },
    { label: 'Build Your Box', ariaLabel: 'Build your own box', link: '/build-box' },
    { label: 'Snack\'d', ariaLabel: 'Limited Drops', link: '/drops' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
    { label: 'Cart', ariaLabel: 'View Your Cart', link: '/cart' },
];

export const dropsData = [
  {
    id: 1,
    title: "Ruby Velvet Chunk",
    description: "A limited deep-red cookie with cream cheese swirls.",
    releaseDate: "2025-12-05T00:00:00", // drop starts
    durationDays: 7, // becomes 'Sold Out' after 7 days
    soldOut: false,
  },
  {
    id: 2,
    title: "Choco Lava Blast",
    description: "Molten chocolate core—baked only for real chocolate addicts.",
    releaseDate: "2025-10-10T00:00:00",
    durationDays: 7,
    soldOut: true,
  },
  {
    id: 3,
    title: "Double Velvet Chunk",
    description: "A limited deep-red cookie with cream cheese swirls.",
    releaseDate: "2025-11-25T00:00:00", // drop starts
    durationDays: 7, // becomes 'Sold Out' after 7 days
    soldOut: false,
  },
  {
    id: 4,
    title: "Choco Lava Blast",
    description: "Molten chocolate core—baked only for real chocolate addicts.",
    releaseDate: "2025-12-10T00:00:00",
    durationDays: 7,
    soldOut: false,
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

export const buildYourBoxOptions = [
  {
    id: "box-4",
    name: "Build Your Box — 4 Cookie Pack",
    size: 4,
    description:
      "Create your perfect mini box! Pick any 4 freshly baked cookies from our signature menu. Mix, match, and craft your own flavor experience — ideal for gifting, cravings, or trying new flavors.",
    price: "Depending On Cookies Flavour", // in PKR or your currency of choice
  },
  {
    id: "box-6",
    name: "Build Your Box — 6 Cookie Pack",
    size: 6,
    description:
      "The ultimate cookie treat. Choose any 6 premium cookies to build your dream box. More cookies, more flavor, more happiness — perfect for sharing or indulging all by yourself.",
    price: "Depending On Cookies Flavour", // in PKR or your currency
  }
];

export const steps = [
    {
      id: 1,
      icon: LuPackage,
      title: "Pick Your Box",
      description: "Choose between our Box of 4 or Box of 6 cookies."
    },
    {
      id: 2,
      icon: LuCookie,
      title: "Choose Your Flavours",
      description: "Mix & match your favorites — we bake fresh instantly."
    },
    {
      id: 3,
      icon: LuTruck,
      title: "Fresh Delivery",
      description: "Freshly baked and delivered across Lahore."
    }
  ];

  
export const items = [
  { id: "1", img: "https://picsum.photos/600/400?random=1", url: "https://example.com/item-1", height: 420 },
  { id: "2", img: "https://picsum.photos/600/400?random=2", url: "https://example.com/item-2", height: 310 },
  { id: "3", img: "https://picsum.photos/600/400?random=3", url: "https://example.com/item-3", height: 550 },
  { id: "4", img: "https://picsum.photos/600/400?random=4", url: "https://example.com/item-4", height: 290 },
  { id: "5", img: "https://picsum.photos/600/400?random=5", url: "https://example.com/item-5", height: 480 },
  { id: "6", img: "https://picsum.photos/600/400?random=6", url: "https://example.com/item-6", height: 360 },
  { id: "7", img: "https://picsum.photos/600/400?random=7", url: "https://example.com/item-7", height: 520 },
  { id: "8", img: "https://picsum.photos/600/400?random=8", url: "https://example.com/item-8", height: 400 },
  { id: "9", img: "https://picsum.photos/600/400?random=9", url: "https://example.com/item-9", height: 520 },
  { id: "10", img: "https://picsum.photos/600/400?random=10", url: "https://example.com/item-10", height: 470 },
  { id: "11", img: "https://picsum.photos/600/400?random=11", url: "https://example.com/item-11", height: 270 },
  { id: "12", img: "https://picsum.photos/600/400?random=12", url: "https://example.com/item-12", height: 270 }
];

export const reviews = [
  {
    id: "1",
    name: "Ali Khan",
    role: "Food Enthusiast",
    comment: "Absolutely loved the cookies! Fresh and delicious.",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Sara Ahmed",
    role: "Baker",
    comment: "The flavors are unique and baked perfectly. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "Hamza Iqbal",
    role: "Customer",
    comment: "Fast delivery and amazing taste. Will order again!",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    name: "Zara Khan",
    role: "Cookie Lover",
    comment: "My kids loved them! Soft, chewy, and sweet.",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "5",
    name: "Usman Ali",
    role: "Sweet Tooth",
    comment: "Quality is top notch. Definitely the best cookies in Lahore!",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "6",
    name: "Ayesha Malik",
    role: "Food Blogger",
    comment: "Beautifully baked and the packaging is so cute!",
    avatar: "https://i.pravatar.cc/150?img=6"
  }
];

