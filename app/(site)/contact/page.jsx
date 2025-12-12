"use client";

import { useState } from "react";
import api from "../../../lib/api";
import { FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await api.post("/contact", form);
      alert("Message sent successfully!");

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      
      {/* Section Heading */}
      <h1 className="text-4xl font-bold text-[#0C2340] mb-2">
        Contact Us
      </h1>
      <p className="text-gray-600 mb-8">
        Have questions or suggestions? We’d love to hear from you.
      </p>

      {/* Contact Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 grid gap-5 border border-gray-100"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-[#0C2340]">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-3 rounded-lg outline-none transition shadow-sm 
                       focus:ring-2 focus:ring-[#F5A623]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-[#0C2340]">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-3 rounded-lg outline-none transition shadow-sm 
                       focus:ring-2 focus:ring-[#1E5BA8]"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium text-[#0C2340]">Message</label>
          <textarea
            placeholder="Write your message here..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border p-3 rounded-lg h-36 resize-none outline-none transition shadow-sm 
                       focus:ring-2 focus:ring-[#0C2340]"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={sending}
          className="flex items-center justify-center gap-2 bg-[#0C2340] 
                     text-white py-3 rounded-lg font-semibold text-lg 
                     hover:bg-[#1E5BA8] transition-shadow shadow-md hover:shadow-lg
                     disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send Message"}
          <FaPaperPlane />
        </button>
      </form>
    </section>
  );
}
