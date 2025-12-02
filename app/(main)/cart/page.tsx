"use client";

import Image from "next/image";
import { useDrop } from "@/lib/context/contextAPI";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useDrop();

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="max-w-6xl mx-auto px-5 pt-28 pb-20">
      <h1 className="text-5xl font-bold mb-10 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border p-6 rounded-2xl shadow-sm bg-white flex flex-col md:flex-row gap-5"
            >
              {/* PRODUCT IMAGE */}
              <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={
                    typeof item.images === "string"
                      ? item.images
                      : item.images[0]
                  }
                  alt={item.title}
                  width={160}
                  height={160}
                  className="object-cover h-full w-full"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>

                  {/* TYPE BADGE */}
                  <p className="text-sm mt-1 text-soft font-semibold uppercase">
                    {item.type === "simple" && "COOKIE"}
                    {item.type === "drop" && "LIMITED DROP"}
                    {item.type === "box" && "CUSTOM BOX"}
                  </p>

                  {/* BOX TYPE EXPANDED VIEW */}
                  {item.type === "box" && item.boxType && (
                    <div className="mt-4 bg-soft/10 p-4 rounded-xl">
                      <p className="font-semibold mb-2">
                        {item.boxType.size}-Cookie Box
                      </p>

                      <div className="space-y-2">
                        {item.boxType.cookies.map((cookie) => (
                          <div
                            key={cookie.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="font-medium">
                              {cookie.title} × {cookie.qty}
                            </span>
                            <span>Rs. {cookie.price * cookie.qty}</span>
                          </div>
                        ))}
                      </div>

                      <p className="font-bold mt-3">
                        Box Total: Rs. {item.boxType.boxTotalPrice}
                      </p>
                    </div>
                  )}

                  {/* PRICE */}
                  <p className="text-xl font-semibold mt-4">
                    Rs. {item.price * item.quantity}
                  </p>
                </div>

                {/* CONTROLS */}
                <div className="flex items-center justify-between mt-6">
                  {/* QUANTITY CONTROLS */}
                  {item.type !== "box" && (
                    <div className="flex items-center gap-3">
                      <button
                        className="w-10 h-10 rounded-lg border flex items-center justify-center"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>

                      <span className="text-xl font-bold">{item.quantity}</span>

                      <button
                        className="w-10 h-10 rounded-lg border flex items-center justify-center"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  )}

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CART TOTAL */}
      <div className="text-right mt-10">
        <h2 className="text-3xl font-bold">Total: Rs. {cartTotal}</h2>

        <button className="mt-6 bg-soft text-white px-10 py-4 text-xl rounded-2xl hover:bg-soft/90 transition">
          Checkout
        </button>
      </div>
    </main>
  );
};

export default CartPage;
