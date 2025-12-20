"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash } from "react-icons/fi";
import { CouponType } from "@/type";
import AdminCheck from "@/components/adminComp/AdminCheck";
import { useDrop } from "@/lib/context/contextAPI";

const CouponsPage = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<number>(0);
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAdminCheck, setShowAdminCheck] = useState(false)
  const {isAdmin, setIsAdmin} = useDrop()

  const fetchCoupons = async () => {
    const res = await axios.get("/api/coupon");
    setCoupons(res.data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async () => {
    if (!code || discount <= 0 || discount > 100) {
      alert("Enter valid code and discount (1–100%)");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/coupon", { code, discount });
      setCode("");
      setDiscount(0);
      fetchCoupons();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating coupon");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsAdmin(false)
    if(isAdmin){
      setDeletingId(id);
    try {
      await axios.delete(`/api/coupon/${id}`);
      fetchCoupons(); // refresh list
    } catch (err) {
      alert("Error deleting coupon");
    }
    setDeletingId(null);
    }else{
        setShowAdminCheck(true)
      }
    };
    

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin - Manage Coupons</h1>

      {/* Add Coupon */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Coupon Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="border px-3 py-2 rounded w-1/2"
        />
        <button
          onClick={handleAddCoupon}
          className="bg-soft text-white px-4 py-2 rounded disabled:bg-soft/40"
          disabled={loading}
        >
          Add
        </button>
      </div>

      {/* Coupon List */}
      <h2 className="text-xl font-semibold mb-2">Existing Coupons</h2>

      <div className="space-y-2">
        {coupons.length === 0 && <p>No coupons available</p>}

        {coupons.map((c) => (
          <div
            key={c._id}
            className="flex justify-between border px-4 py-2 rounded shadow-sm bg-white"
          >
            <span className="font-semibold">{c.code}</span>

            <div className="flex gap-6 items-center">
              <span className="font-medium">{c.discount}%</span>

              {deletingId === c._id ? (
                <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full" />
              ) : (
                <FiTrash
                  className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition"
                  onClick={() => handleDelete(c._id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {showAdminCheck && (
        <AdminCheck onClose={() => setShowAdminCheck(false)} />
      )}
    </div>
  );
};

export default CouponsPage;
