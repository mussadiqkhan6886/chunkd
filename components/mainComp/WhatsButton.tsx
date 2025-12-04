"use client";

import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsButton = () => {
  const whatsappNumber = "923123456789"; // Replace with your WhatsApp number
  const message = "Hello! I want to inquire about your Cookies."; // Default message

  return (
    <Link
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 transition-all"
    >
      <FaWhatsapp className="text-3xl" />
    </Link>
  );
};

export default WhatsButton;
