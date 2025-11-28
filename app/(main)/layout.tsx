import Footer from "@/components/mainComp/Footer";
import Header from "@/components/mainComp/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
        {children}
        
      <Footer />
    </>
  );
}
