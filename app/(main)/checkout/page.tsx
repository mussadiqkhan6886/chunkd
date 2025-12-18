'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useDrop } from "@/lib/context/contextAPI";
import { CartItem } from "@/type";
import Link from "next/link";

interface DeliveryChargeType {
  city: string
  charge: number
}

const Checkout = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "",
    date: "",
    orderType: "",
    time: ""
  });

  const {clearCart} = useDrop()

  const [cart] = useState(() => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("orderData")
  return data ? JSON.parse(data) : []
})
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null); 
  const [preview, setPreview] = useState<string | null>(null);
  const [deliveryCharges, setDeliveryCharges] = useState(0)


 useEffect(() => {
  const getDeliveryCharges = async () => {
    try {
      const res = await fetch("/api/deliveryCharges")
      const json = await res.json()

      if (!cart?.city) return

      const currentCharges = json.find(
        (item: DeliveryChargeType) =>
          item.city.toLowerCase() === cart.city.toLowerCase()
      )

      if (currentCharges) {
        setDeliveryCharges(currentCharges.charge)
      }
    } catch (error) {
      console.error("Failed to fetch delivery charges", error)
    }
  }

  getDeliveryCharges()
}, [cart.city])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files[0]) { setPaymentProof(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); } };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      setStatus("Your cart is empty.");
      return;
    }

    setStatus("Sending...");
    setLoading(true);

    const data = {
      // include images for each item
      items: cart.cart.map((item: CartItem) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        images: item.images[0],
      })),
      totalPrice: cart.totalAmount + deliveryCharges, 
      userDetails: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || "No email",
      },
      notes: formData.notes || "No Notes",
      shippingAddress: {
        city: cart.city || "",
        address: cart.address || "",
      },
      paymentMethod: formData.paymentMethod,
      date: cart.date,
      orderType: cart.orderType,
      time: cart.time
    };


    const formDataToSend = new FormData();
    if(paymentProof){
      formDataToSend.append("paymentProof", paymentProof);
    }
    formDataToSend.append("orderData", JSON.stringify(data));

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
        formDataToSend,{ headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus("Order placed successfully!");

      clearCart()

      // redirect to thank you page
      router.push(`/thank-you/${res.data.order._id}`);
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex flex-col md:flex-row justify-between">
        {/* LEFT: FORM */}
        <div className="w-full py-5 border-r lg:pl-20 pl-5 pr-5 border-gray-300 md:w-2/3">
          <h1 className="text-3xl text-center font-bold mb-6 border-b border-gray-300 pb-2">
            <Link href={"/"}>
              Checkout  
            </Link>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
          >
            <div className="space-y-4">
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
            </div>

            <div className="space-y-4">
              <textarea
                name="notes"
                placeholder="Order Notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                rows={7}
                className="w-full p-3 border-gray-300 outline-none border rounded-md"
              />
            </div>
            <div className="md:col-span-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                Payment Method
              </h3>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="card">Bank Payment</option>
              </select>

              <p className="mt-2 text-xs text-gray-500">
                Secure bank transfer. Your payment details are safe.
              </p>
            </div>
            <div className=" border border-blue-400 bg-blue-50 rounded-lg p-4 space-y-3"> <h3 className="font-semibold text-blue-800 text-lg">Bank Transfer</h3> <p><strong>Bank:</strong> HBL</p> <p><strong>Account Title:</strong> IQRA NAA</p> <p><strong>Account No:</strong> 12877902882799</p>
            <p><strong>IBAN:</strong> PK84HABB0012877902882799</p><p><strong>BRANCH:</strong> DHUDHIAL</p> <label className="block text-sm font-medium text-gray-700 mt-2"> Upload Payment Proof </label> <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-200 hover:file:bg-gray-300" /> {preview && ( <div className="mt-3"> <Image src={preview} alt="Payment proof" width={200} height={200} className="rounded-md border" /> </div> )} </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0 || paymentProof === null}
              className={`md:col-span-2 w-full cursor-pointer text-white py-3 rounded-md transition ${
                loading ? "bg-gray-600" : "bg-black not-disabled:hover:bg-gray-800" 
              } disabled:opacity-45 disabled:cursor-not-allowed`}
            >
              {loading ? "Loading..." : "Place Order"}
            </button>
          </form>

          {status && (
            <p className="my-6 text-center text-black font-medium">{status}</p>
          )}
        </div>

        {/* RIGHT: CART SUMMARY */}
        <div className="w-full md:w-1/3 bg-gray-100 py-6 px-6">
          <h3 className="text-xl font-semibold mb-4">Your Cart</h3>

          {cart.cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {cart.cart.map((item: CartItem, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex gap-5">
                    {item.images ? (
                      <Image
                        width={100}
                        height={100}
                        className="w-[70px] h-[70px] object-cover rounded"
                        src={item.images}
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-[70px] h-[70px] bg-gray-200 flex items-center justify-center text-xs">
                        No Img
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{item.title} </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">{item.price * item.quantity} PKR</p>
                </div>
              ))}

              
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Shipping:</span>
                <span>{deliveryCharges} PKR</span>
              </div>
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Total:</span>
                <span>{cart.totalAmount + deliveryCharges} PKR</span>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Checkout;
