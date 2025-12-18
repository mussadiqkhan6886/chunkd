"use client";

import { useDrop } from "@/lib/context/contextAPI";
import { CookieType } from "@/type";
import React, { useEffect, useState } from "react";

const AddToCart = ({
  releaseDate,
  endDate,
  soldOut,
  active,
  data,
}: {
  releaseDate: string;
  endDate: string;
  soldOut: boolean;
  active: boolean;
  data: CookieType;
}) => {
  const { getStatus, addToCart} = useDrop();
  const [loading, setLoading] = useState(false);

 const [liveStatus, setLiveStatus] = useState(false);

useEffect(() => {
  const now = new Date();
  const release = new Date(data.releaseDate!);
  const end = new Date(data.endDate!);

  if(data.releaseDate === undefined && data.endDate === undefined){
    setLiveStatus(true)
  }else{
    setLiveStatus(now >= release && now <= end);
  }
}, [data]);



  const status = getStatus(releaseDate, endDate, soldOut, active);

  const handleAdd = async (type: "simple" | "drop") => {
    setLoading(true);
    await addToCart({
      id: data._id,
      type,
      isLive: liveStatus,
      title: data.title,
      price: data.price,
      images: data.images[0],
      quantity: 1,
      totalLimit: data.totalLimit!,
    });
    setTimeout(() => setLoading(false), 700);
  };

  const isSimple = !releaseDate && !endDate;

  // SIMPLE PRODUCT
  if (isSimple)
    return (
      <button
        disabled={loading}
        onClick={() => handleAdd("simple")}
        className="mt-5 w-full py-3 rounded-xl bg-soft text-white font-semibold hover:bg-soft/90 transition"
      >
        {loading ? "Adding..." : "Add To Cart"}
      </button>
    );

  // DROP: Coming Soon → Pre Order
  if (status === "Coming Soon")
    return (
      <button
        disabled={loading}
        onClick={() => handleAdd("drop")}
        className="mt-5 w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-black/80 transition"
      >
        {loading ? "Adding..." : "Add To Cart (Pre-Order)"}
      </button>
    );

  // DROP: Live
  if (status === "Live")
    return (
      <button
        disabled={loading}
        onClick={() => handleAdd("drop")}
        className="mt-5 w-full py-3 rounded-xl bg-soft text-white font-semibold hover:bg-soft/90 transition"
      >
        {loading ? "Adding..." : "Add To Cart"}
      </button>
    );

  // SOLD OUT
  if (status === "Sold Out")
    return (
      <button
        disabled
        className="mt-5 w-full py-3 rounded-xl bg-red-500 text-white font-semibold cursor-not-allowed"
      >
        Sold Out
      </button>
    );

  return null;
};

export default AddToCart;
