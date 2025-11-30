'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import DropTable from "@/components/adminComp/DropTable";

export default function AdminDropsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/drops`);
        setProducts(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  if (loading) return <div className="text-center py-10">Loading...</div>;


  return (
    <div className="p-5">
      <h1 className="text-2xl text-center font-semibold mb-4">Drops List</h1>
      <DropTable products={products} />
    </div>
  );
}
