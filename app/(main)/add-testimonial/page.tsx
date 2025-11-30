"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiStar } from "react-icons/fi";

const AddTestimonialPage = () => {
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    message: "",
  });
  const [result,setResult] = useState("")
  const router = useRouter()
  const stars = [1, 2, 3, 4, 5];

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
        setTimeout(() => {
          router.push("/")
        }, 1500)
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
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-main/90 transition"
        >
          Submit Review
        </button>
        <p className="text-center">{result}</p>
      </form>
    </div>
    </main>
  );
};

export default AddTestimonialPage;
