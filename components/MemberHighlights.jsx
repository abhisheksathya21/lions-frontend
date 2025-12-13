"use client";

import React from "react";
import Skeleton from "./Skeleton";

export default function MemberHighlights({ members = [], loading = false }) {
  const roles = ["President", "Secretary", "Treasurer"];
  const leaders = roles
    .map((r) => members.find((m) => m.role === r))
    .filter(Boolean);

  const display = leaders.length ? leaders : members.slice(0, 3);

  return (
    <section className="my-16 px-2 md:px-0">
      {/* Title Row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#0C2340]">Our Leaders</h2>
        <a
          href="/members"
          className="text-sm text-[#1E5BA8] font-medium hover:underline"
        >
          View all
        </a>
      </div>

      {/* Loading */}
      {loading && !members.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {display.map((m, idx) => (
            <div
              key={m?._id ?? idx}
              className="
                bg-white/80 backdrop-blur-md border border-gray-200
                rounded-xl p-5 text-center
                shadow-lg hover:shadow-xl
                transition-all hover:-translate-y-1
              "
            >
              {/* PERFECT CIRCLE IMAGE */}
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
                <img
                  src={m?.photo || "/placeholder-profile.png"}
                  alt={m?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-lg md:text-xl font-semibold text-[#0C2340]">
                {m?.name ?? "Member"}
              </h3>

              {/* Role */}
              <span
                className="mt-2 px-3 py-1 inline-block text-sm font-medium rounded"
                style={{ background: "#FFF4E6", color: "#8A4B00" }}
              >
                {m?.role ?? "Member"}
              </span>

              {/* Phone */}
              {m?.phone && (
                <p className="text-sm text-gray-600 mt-2">{m.phone}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
