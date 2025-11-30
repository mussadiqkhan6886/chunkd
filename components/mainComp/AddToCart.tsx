'use client';

import { useDrop } from "@/lib/context/contextAPI";
import React from "react";

const AddToCart = ({releaseDate, endDate, soldOut, active}: {releaseDate: string, endDate: string, soldOut: boolean, active: boolean}) => {

  const {getStatus} = useDrop()
  const status = getStatus(releaseDate, endDate, soldOut, active)

  return (
    <>
      {status === "Coming Soon" && (
        <button className="mt-5 w-full py-3 rounded-xl bg-black text-white font-semibold">
          Pre-Order
        </button>
      )}

      {status === "Live" && (
        <button className="mt-5 w-full py-3 rounded-xl bg-soft text-white font-semibold hover:bg-soft/90 transition">
          Buy Now
        </button>
      )}
    </>
  );
};

export default AddToCart;
