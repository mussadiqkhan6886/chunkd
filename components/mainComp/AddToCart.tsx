import React from "react";

const AddToCart = ({ status }: { status: string }) => {
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
