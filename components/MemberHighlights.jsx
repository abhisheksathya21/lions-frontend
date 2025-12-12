"use client";

import React from "react";
import Skeleton from "./Skeleton";

export default function MemberHighlights({ members = [], loading = false }) {
  const roles = ["President", "Secretary", "Treasurer"];
  const leaders = roles.map((r) => members.find((m) => m.role === r)).filter(Boolean);
  const display = leaders.length ? leaders : members.slice(0, 3);

  return (
    <section className="my-16 px-2 md:px-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-[#0C2340] mb-6">Our Leaders</h2>
        <a href="/members" className="text-sm text-[#1E5BA8] font-medium">
          View all
        </a>
      </div>
     

      {loading && !members.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {display.map((m, idx) => (
            
            <div
              key={m?._id ?? idx}
              className="relative bg-white rounded-xl p-5 shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={m?.photo || "/placeholder-profile.png"}
                    alt={m?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#0C2340]">
                    {m?.name ?? "Member"}
                  </h3>

                  <span
                    className="px-2 py-0.5 rounded text-sm font-medium"
                    style={{ background: "#FFF4E6", color: "#8A4B00" }}
                  >
                    {m?.role ?? "Member"}
                  </span>

                  {m?.phone && (
                    <div className="text-sm text-gray-600 mt-2">{m.phone}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
        </div>
        
      )}
    </section>
  );
}
