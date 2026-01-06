import type { Metadata } from "next";
import "./globals.css";
import { mainFont } from "@/lib/font/font";
import { DropProvider } from "@/lib/context/contextAPI";

export const metadata: Metadata = {
  title: {
    default: "Chunk'd Delicious Cookies, Freshly Baked",
    template: "%s | Chunk'd",
  },
  description: "Chunk'd is your go-to cookie shop offering freshly baked, mouth-watering cookies for every occasion. Order online or pick-up from store!",
  keywords: [
    "Chunk'd", "Cookies", "Cookie Shop", "Bakery", "Fresh Cookies", "Desserts", "Baked Goods", "bakery", "chocolate", "double chocolate"
  ],
  authors: [
    { name: "chunk'd", url: "https://www.chunkdpk.com/" }
  ],
  metadataBase: new URL("https://www.chunkdpk.com/"),
  creator: "Mussadiq Khan",
  publisher: "Chunk'd Cookies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Chunk'd – Delicious Cookies, Freshly Baked",
    description: "Enjoy freshly baked cookies from Chunk'd – perfect for gifts, parties, or a sweet treat any time.",
    url: "https://www.chunkdpk.com/",
    siteName: "Chunk'd Cookies",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Chunk'd Cookies Preview",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chunk'd – Delicious Cookies, Freshly Baked",
    description: "Satisfy your sweet tooth with Chunk'd Cookies – baked fresh daily for maximum yum!",
    images: ["/logo.png"],
    creator: "@chunkdcookies",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className={`${mainFont.className} antialiased`}>
        <DropProvider>
          
          {children}
        </DropProvider>
      </body>
    </html>
  );
}
