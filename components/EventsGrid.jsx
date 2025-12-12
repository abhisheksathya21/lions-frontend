"use client";

import React from "react";
import Skeleton from "./Skeleton";

export default function EventsGrid({ events = [], loading = false }) {
  return (
    <section className="my-16 px-2 md:px-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-[#0C2340]">Upcoming Events</h2>
        <a href="/events" className="text-sm text-[#1E5BA8] font-medium">
          View all
        </a>
      </div>

      {loading && !events.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-600">
          No upcoming events available.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <article
              key={ev._id}
              className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition"
            >
              {ev.image ? (
                <div className="relative h-32 md:h-40">
                  <img
                    src={ev.image}
                    className="w-full h-full object-cover"
                    alt={ev.title}
                  />
                  <div className="absolute left-2 top-2 bg-[#F5A623] text-[#0C2340] px-2 py-1 rounded font-semibold text-xs md:text-sm shadow">
                    {new Date(ev.date).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <div className="h-32 md:h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-base md:text-lg text-[#0C2340]">
                  {ev.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 mt-2 line-clamp-3">
                  {ev.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs md:text-sm text-[#1E5BA8] font-medium">
                    {ev.date}
                  </span>

                  <a
                    href={`/events/${ev._id}`}
                    className="text-xs md:text-sm font-semibold text-[#F5A623]"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
