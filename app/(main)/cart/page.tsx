"use client";

import Image from "next/image";
import { useDrop } from "@/lib/context/contextAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useDrop();

  const [same, setSame] = useState(false);
  const [orderType, setOrderType] = useState<"delivery" | "pickup" | "preOrder" | null>(null);
  const [showTimingPopup, setShowTimingPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("lahore");
  const [finalOrder, setFinalOrder] = useState<any>(null);

  const hasLive = cart.some((item) => item.isLive === true);
  const hasPreOrder = cart.some((item) => item.isLive === false);

  useEffect(() => {
    setSame(hasLive && hasPreOrder);
  }, [cart]);

  // Save final order object based on type
  useEffect(() => {
    if (!orderType) return;

    if (orderType === "delivery" && address && city) {
      setFinalOrder({ cart, totalAmount,orderType, address, city, date: "now", time: "now" });
    } else if (orderType === "pickup" && selectedDate && selectedTime) {
      setFinalOrder({ cart, totalAmount,orderType, date: selectedDate, time: selectedTime });
    } else if (orderType === "preOrder" && selectedDate && selectedTime && address && city) {
      setFinalOrder({ cart, totalAmount,orderType, date: selectedDate, time: selectedTime, address, city });
    } else {
      setFinalOrder(null);
    }
  }, [orderType, selectedDate, selectedTime, address, city, cart]);

  // Handle order type selection
  const handleOrderType = (type: "delivery" | "pickup" | "preOrder") => {
    setOrderType(type);

    if (type === "pickup" || type === "preOrder" || type === "delivery") {
      setShowTimingPopup(true);
    } else {
      setShowTimingPopup(false);
    }
  };

  // Save popup
  const handleSavePopup = () => {
    if (orderType === "pickup" && (!selectedDate || !selectedTime)) return;
    if (orderType === "preOrder" && (!selectedDate || !selectedTime || !address || !city)) return;

    setShowTimingPopup(false);
  };

  return (
    <main className="max-w-6xl bg-secondary mx-auto px-5 pt-28 pb-20">
      <h1 className="text-5xl font-bold mb-10 text-center">Your Cart</h1>

      {same && (
        <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-md mb-4 text-center font-semibold shadow-sm">
          ⚠️ Your cart has both live and pre-order cookies. Please separate them into different orders.
        </div>
      )}

      {!orderType && cart.length > 0 && !same && (
        <p className="text-center mb-4">Please choose delivery, pickup or pre-order</p>
      )}

      {/* Order Type Buttons */}
      {!same && cart.length > 0 && (
        <div className="flex gap-4 my-6 max-w-xl mx-auto justify-center">
          {hasPreOrder && (
            <button
              onClick={() => handleOrderType("preOrder")}
              className={`${orderType === "preOrder" ? "bg-soft text-white scale-105" : "bg-secondary text-black"} w-full border border-black/20 px-5 py-3 rounded-xl transition`}
            >
              Pre Order
            </button>
          )}
          {!hasPreOrder && (
            <button
              onClick={() => handleOrderType("delivery")}
              className={`${orderType === "delivery" ? "bg-soft text-white scale-105" : "bg-secondary text-black"} w-full border border-black/20 px-5 py-3 rounded-xl transition`}
            >
              Delivery
            </button>
          )}
          <button
            onClick={() => handleOrderType("pickup")}
            className={`${orderType === "pickup" ? "bg-soft text-white scale-105" : "bg-secondary text-black"} w-full border border-black/20 px-5 py-3 rounded-xl transition`}
          >
            Pickup
          </button>
        </div>
      )}

{showTimingPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl relative w-98 shadow-xl">
      <FiX className="absolute top-5 right-5 cursor-pointer" onClick={() => setShowTimingPopup(false)} />
      <h2 className="text-xl font-bold mb-4 text-center">
        {orderType === "pickup"
          ? "Pickup Timing"
          : orderType === "preOrder"
          ? "Pre-Order Timing & Address"
          : "Delivery Address"}
      </h2>

      {/* Date/Time only for pickup/preOrder */}
      {orderType === "pickup" && <div className="my-2">
          <p className="font-medium ">Address: </p>
          <p>(pickup address)</p>
        </div>}
      {(orderType === "pickup" || orderType === "preOrder") && (
        <>
          <label className="text-sm font-semibold">Choose Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded mb-4"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <label className="text-sm font-semibold">Choose Time</label>
          <select
            className="border p-2 w-full rounded mb-4"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select Time</option>
            {orderType === "pickup" && (
              <>
                <option>12:00 PM - 2:00 PM</option>
                <option>2:00 PM - 4:00 PM</option>
                <option>4:00 PM - 6:00 PM</option>
              </>
            )}
            {orderType === "preOrder" && (
              <>
                <option>2:00 PM - 4:00 PM</option>
                <option>4:00 PM - 6:00 PM</option>
              </>
            )}
          </select>
        </>
      )}

      {/* Address/City for delivery or preOrder */}
      {(orderType === "delivery" || orderType === "preOrder") && (
        <>
          <label className="block text-sm font-semibold">Full Address</label>
          <textarea
            className="border p-2 w-full rounded mb-4"
            placeholder="Enter Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className="block text-sm font-semibold">City</label>
          <select
            className="border p-2 w-full rounded mb-4"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City</option>
            <option value="lahore">Lahore</option>
          </select>
        </>
      )}

      <button
        onClick={handleSavePopup}
        disabled={
          (orderType === "pickup" && (!selectedDate || !selectedTime)) ||
          (orderType === "preOrder" && (!selectedDate || !selectedTime || !address || !city)) ||
          (orderType === "delivery" && (!address || !city))
        }
        className={`mt-4 w-full py-2 rounded-xl text-white ${
          (orderType === "pickup" && selectedDate && selectedTime) ||
          (orderType === "preOrder" && selectedDate && selectedTime && address && city) ||
          (orderType === "delivery" && address && city)
            ? "bg-soft"
            : "bg-soft/40"
        }`}
      >
        Save
      </button>
    </div>
  </div>
)}


      {/* Cart Items */}
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border p-6 border-soft bg-white flex flex-col md:flex-row gap-5 rounded-xl shadow-sm"
            >
              {/* Product Image */}
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
                      <p className="text-sm font-semibold text-gray-600 text-center truncate w-full">
                        {singleCookie.title}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {singleCookie.qty}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full md:w-40 h-40 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center overflow-hidden hover:shadow-md transition relative">
                  {!item.isLive && item.type === "drop" && (
                    <div className="bg-soft text-black font-bold capitalize absolute px-2 top-0 text-sm">
                      Only Pre Order
                    </div>
                  )}
                  <Image
                    src={typeof item.images === "string" ? item.images : item.images[0]}
                    alt={item.title}
                    width={160}
                    height={160}
                    className="object-cover h-full w-full"
                  />
                </div>
              )}

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-sm mt-1 text-soft font-semibold uppercase">
                    {item.type === "simple" && "COOKIE"}
                    {item.type === "drop" && "LIMITED DROP"}
                    {item.type === "box" && "CUSTOM BOX"}
                  </p>

                  {item.type === "box" && item.boxType && (
                    <div className="mt-4 bg-soft/10 p-4 rounded-xl">
                      <p className="font-semibold mb-2">{item.boxType.size}-Cookie Box</p>
                      <div className="space-y-2">
                        {item.boxType.cookies.map((cookie) => (
                          <div key={cookie.id} className="flex items-center justify-between text-sm">
                            <span className="font-medium">
                              {cookie.title} × {cookie.qty}
                            </span>
                            <span>Rs. {cookie.price * cookie.qty}</span>
                          </div>
                        ))}
                      </div>
                      <p className="font-bold mt-3">Box Total: Rs. {item.boxType.boxTotalPrice}</p>
                    </div>
                  )}

                  <p className="text-xl font-semibold mt-4">
                    Rs. {item.price}
                    <span className="inline-block ml-1 text-sm font-[400]">× {item.quantity}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  {item.type !== "box" && (
                    <div className="flex items-center gap-3">
                      <button
                        className="w-10 h-10 rounded-lg border flex items-center justify-center"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
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
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 underline font-semibold">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Total */}
      <div className="text-right mt-10">
        <h2 className="text-3xl font-bold">Total: Rs. {totalAmount}</h2>

        {finalOrder ? (
          <Link
            href="/checkout"
            onClick={() => localStorage.setItem("orderData", JSON.stringify(finalOrder))}
            className="mt-6 bg-soft text-white px-10 py-4 text-xl rounded-2xl inline-block"
          >
            Checkout
          </Link>
        ) : (
          <button disabled className="mt-6 bg-soft/40 text-white px-10 py-4 text-xl rounded-2xl">
            Checkout
          </button>
        )}
      </div>
    </main>
  );
};

export default CartPage;
