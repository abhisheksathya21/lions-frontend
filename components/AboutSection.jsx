"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import Skeleton from "./Skeleton";

export default function AboutSection() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await api.get("/about");
        setAbout(res.data);
      } catch (err) {
        console.log("About fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  // ---------------- Loading State UI ----------------
  if (loading) {
    return (
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10">
        <div>
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-10 w-1/3 mb-4" />
          <Skeleton className="h-6 w-full mb-3" />
        </div>
        <Skeleton className="w-full h-72 rounded-xl" />
      </section>
    );
  }

  if (!about) return null;

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* ---- Left Content ---- */}
        <div>
          <h2 className="text-4xl font-extrabold text-[#0C2340] leading-snug mb-4">
            {about.title}
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {about.description}
          </p>

          {/* Mission block */}
          <div className="bg-[#F8F9FA] p-6 rounded-xl shadow-md border-l-4 border-[#F5A623]">
            <h3 className="text-2xl font-semibold text-[#1E5BA8] mb-2">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {about.mission}
            </p>
          </div>
        </div>

        {/* ---- Right Image ---- */}
        {about.image && (
          <div>
            <img
              src={about.image}
              alt="About"
              className="rounded-xl shadow-lg w-full h-[350px] object-cover border border-gray-200"
            />
          </div>
        )}
      </div>
    </section>
  );
}
