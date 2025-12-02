'use client';

import { useDrop } from "@/lib/context/contextAPI";
import Link from "next/link";
import React from "react";

const AddToCart = ({releaseDate, endDate, soldOut, active}: {releaseDate: string, endDate: string, soldOut: boolean, active: boolean}) => {

  const {getStatus} = useDrop()
  const status = getStatus(releaseDate, endDate, soldOut, active)

  return (
    <>
    {
      (releaseDate === undefined && endDate === undefined) && (
        <button className="mt-5 w-full py-3 rounded-xl bg-soft text-white font-semibold hover:bg-soft/90 transition">
          Add To Cart
        </button>
      )
    }
      {status === "Coming Soon" && (
        <button className="mt-5 w-full py-3 rounded-xl bg-black text-white font-semibold">
          <Link href={`/choose/pre-order`}>Pre-Order</Link>
        </button>
      )}

      {status === "Live" && (
        <button className="mt-5 w-full py-3 rounded-xl bg-soft text-white font-semibold hover:bg-soft/90 transition">
          Add To Cart
        </button>
      )}
    </>
  );
};

export default AddToCart;
