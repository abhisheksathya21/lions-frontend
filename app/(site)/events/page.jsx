"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <section className="px-4 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0C2340] mb-8">Events</h1>

      {/* GRID SYSTEM */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3
 gap-6">
        {events.map((ev) => (
          <div
            key={ev._id}
            className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            {/* IMAGE */}
            {ev.image ? (
              <div className="relative">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-48 object-cover rounded-lg"
                />

                {/* DATE BADGE */}
                <span className="absolute bottom-2 right-2 bg-[#F5A623] text-[#0C2340] px-3 py-1 text-sm rounded shadow font-semibold">
                  {new Date(ev.date).toLocaleDateString()}
                </span>
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* TITLE */}
            <h2 className="text-xl font-semibold mt-3 text-[#0C2340]">
              {ev.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mt-1 line-clamp-3">{ev.description}</p>
             <a
                    href={`/events/${ev._id}`}
                    className="text-xs md:text-sm font-semibold text-[#F5A623]"
                  >
                    Read more →
                  </a>
          </div>
        ))}
      </div>
    </section>
  );
}
