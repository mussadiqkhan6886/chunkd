"use client";

import Image from "next/image";
import { useDrop } from "@/lib/context/contextAPI";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useDrop();
  const [same, setSame] = useState(false)

  useEffect(() => {
    setSame(cart.some(item => item.isLive === false))
  }, [cart])

    


  return (
    <main className="max-w-6xl bg-secondary mx-auto px-5 pt-28 pb-20">
      <h1 className="text-5xl font-bold mb-10 text-center">Your Cart</h1>
      {same && (
        <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-md mb-4 text-center font-semibold shadow-sm">
          ⚠️ Your cart has both live and non-live cookies. Please separate them into different orders.
        </div>
      )}
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border-r-10 border-b-10 border p-6 border-soft bg-white flex flex-col md:flex-row gap-5"
            >
              {/* PRODUCT IMAGE */}
              {item.boxType ? (
                    <div className="grid grid-cols-2 gap-3 p-3 bg-gradient-to-br from-soft/10 to-white rounded-2xl shadow-sm border border-soft/20">
                        {item.boxType.cookies.map((singleCookie, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white rounded-xl shadow-sm p-2 border border-gray-200 hover:shadow-md transition"
                        >
                          
                            <div className="w-24 h-24 rounded-lg overflow-hidden mb-2">
                            <Image
                                src={singleCookie.image}
                                alt={singleCookie.title}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover object-center"
                            />
                            </div>

                            <p className="text-sm font-semibold text-gray-600 text-center truncate  w-full">
                            {singleCookie.title} 
                            </p>

                            <p className="text-xs text-gray-500">Qty: {singleCookie.qty}</p>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <div className="w-full md:w-40 h-40 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center overflow-hidden hover:shadow-md transition relative">
                      {(!item.isLive && item.type === "drop") && <div className="bg-soft text-black font-bold capitalize absolute px-2 top-0 text-sm">Only Pre Order</div>}
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
                    )}


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
        <h2 className="text-3xl font-bold">Total: Rs. {totalAmount}</h2>

        {(cart.length > 0 && !same) ? <Link href={"/checkout"} className="mt-6 bg-soft text-white px-10 py-4 text-xl rounded-2xl hover:bg-soft/90 transition inline-block">Checkout</Link> : <button
            disabled
            className="mt-6 bg-soft/40 text-white px-10 py-4 text-xl rounded-2xl ">
          Checkout
        </button>}
      </div>
    </main>
  );
};

export default CartPage;
