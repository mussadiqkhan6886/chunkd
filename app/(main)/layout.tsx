'use client';

import Footer from "@/components/mainComp/Footer";
import Header from "@/components/mainComp/Header";
import dynamic from "next/dynamic";
const MetaPixel = dynamic(() => import("@/components/adminComp/MetaPixel"), {ssr: false})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <MetaPixel />
      <Header />
        {children}
      <Footer />
    </>
  );
}
