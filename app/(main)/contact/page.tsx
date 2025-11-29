"use client";

import React from "react";

const ContactPage = () => {
  return (
    <main className="max-w-6xl mx-auto p-6 pt-28">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-soft to-pink-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mt-4">
          Got questions, feedback, or cravings? We're here to help.  
          Reach out and our team will get back to you shortly.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div className="space-y-7">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Customer Support</h2>
            <p className="text-gray-600">We reply within a few hours.</p>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-medium">📩 Email</p>
            <p className="text-gray-600">support@chunkd.com</p>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-medium">📞 Phone</p>
            <p className="text-gray-600">+92 300 1234567</p>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-medium">📍 Location</p>
            <p className="text-gray-600">Chunk’d Bakery, Lahore, Pakistan</p>
          </div>

          <div className="pt-5">
            <p className="text-gray-500 text-sm">
              Delivery Hours: <span className="font-semibold">11am – 6pm</span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white shadow-md border border-soft/30 rounded-2xl p-8 space-y-6">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-soft outline-none"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-soft outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-soft outline-none h-32 resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-soft text-white font-semibold hover:bg-soft/90 transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </main>
  );
};

export default ContactPage;
