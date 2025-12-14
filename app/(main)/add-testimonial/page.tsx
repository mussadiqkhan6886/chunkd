"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiStar, FiXCircle } from "react-icons/fi";

const AddTestimonialPage = () => {
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    message: "",
  });
  const [result,setResult] = useState("")
  const router = useRouter()
  const stars = [1, 2, 3, 4, 5];
  const [quit, setQuit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/testimonials", form);
      if (res.data.success) {
        setResult("Review added successfully!")
        setForm({ name: "", rating: 0, message: "" });
        setQuit(true)
        setTimeout(() => {
          router.push("/")
        }, 4500)
      } else {
        setResult("Failed to add testimonial.");
      }
    } catch (error) {
      setResult("Something went wrong!")
      console.error(error);
    } 
  };

  return (
    <main className="bg-soft">
    <div className="max-w-xl bg-secondary mx-auto py-20 px-6">
      <h1 className="text-3xl font-semibold text-center text-main mb-8">
        Add Review
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-5"
      >
        <div>
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-main"
            required
          />
        </div>

         <div className="flex items-center gap-1">
          <span>Rating: </span>
            {stars.map((star) => (
              <button
                type="button"  // <-- IMPORTANT FIX
                key={star}
                onClick={() => setForm(prev => ({ ...prev, rating: star }))}
                className="text-3xl transition"
              >
                {star <= form.rating ? <FiStar color="yellow" size={26} /> : <p className="hover:text-yellow-300">☆</p>}
              </button>
            ))}

            <span className="ml-2 text-lg font-semibold">{form.rating}/5</span>
          </div>


        <div>
          <label className="block mb-1 text-gray-700">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-main resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={form.rating === 0}
          className="w-full bg-black text-white disabled:opacity-40 py-2 rounded-lg hover:bg-main/90 transition"
        >
          Submit Review
        </button>
        <p className="text-center">{result}</p>
      </form>
    </div>
    {quit && (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative shadow-2xl">
          <FiXCircle
            className="absolute right-4 top-4 text-2xl cursor-pointer"
            onClick={() => setQuit(false)}
          />

          <h4 className="text-2xl font-semibold mb-2">
            Review Added 🎉
          </h4>
          <p className="text-gray-600">
            Your review has been sent for approval.
          </p>
        </div>
      </div>
    )}
    </main>
  );
};

export default AddTestimonialPage;
