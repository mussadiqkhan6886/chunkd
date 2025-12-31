import { LuPackage, LuCookie, LuTruck } from "react-icons/lu";

export const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Menu', ariaLabel: 'View our Menu', link: '/menu' },
    { label: 'Build Your Box', ariaLabel: 'Build your own box', link: '/build-box' },
    { label: 'Snack\'d', ariaLabel: 'Limited Drops', link: '/drops' },
    // { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
    // { label: 'Cart', ariaLabel: 'View Your Cart', link: '/cart' },
];

export const buildYourBoxOptions = [
  {
    id: "box-4",
    name: "Build Your Box — 4 Cookie Pack",
    size: 4,
    description:
      "Create your perfect mini box! Pick any 4 freshly baked cookies from our signature menu. Mix, match, and craft your own flavor experience — ideal for gifting, cravings, or trying new flavors.",
    price: "Depending On Cookies Flavour", // in PKR or your currency of choice
    image: "/boxoffour.png"
  },
  {
    id: "box-6",
    name: "Build Your Box — 6 Cookie Pack",
    size: 6,
    description:
      "The ultimate cookie treat. Choose any 6 premium cookies to build your dream box. More cookies, more flavor, more happiness — perfect for sharing or indulging all by yourself.",
    price: "Depending On Cookies Flavour", // in PKR or your currency
    image: "/boxofsix.png"
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


