"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../../lib/api";

import Skeleton from "../../../components/Skeleton";
import { ROLES } from "../../../components/admin/roles";

/**
 * Members page - uses the exact card style from MemberHighlights
 * Grid: 2 cols on small/mobile, 3 cols on md+
 */
export default function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await api.get("/members");
        if (!mounted) return;
        setMembers(res.data || []);
      } catch (err) {
        console.error("Failed to load members", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const filteredMembers = members.filter((m) => {
    const matchesSearch = `${m.name} ${m.role} ${m.phone}`.toLowerCase().includes(search.toLowerCase());
    const matchesRole = role === "All" || m.role === role;
    return matchesSearch && matchesRole;
  });

  return (
    <section className="px-4 md:px-8 py-10">
      {/* Breadcrumbs */}
    

      <h1 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-8">Our Members</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-[#1E5BA8]"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#1E5BA8]"
        >
          <option value="All">All Roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 rounded-xl bg-gray-200 animate-pulse h-48" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMembers.map((m) => (
            <Link
              key={m._id}
              href={`/members/${m._id}`}
              className="group block bg-white/80 backdrop-blur-md border border-gray-200 p-5 rounded-xl shadow hover:shadow-xl transition-all transform hover:-translate-y-1 text-center"
            >
              {/* Profile Image */}
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
                <img
                  src={m.photo || "/placeholder-profile.png"}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h2 className="text-lg md:text-xl font-semibold text-[#0C2340]">{m.name}</h2>

              {/* Role Badge (same style as MemberHighlights) */}
              <div className="mt-2">
                <span
                  className="px-3 py-0.5 rounded text-sm font-medium inline-block"
                  style={{ background: "#FFF4E6", color: "#8A4B00" }}
                >
                  {m.role || "Member"}
                </span>
              </div>

              {/* Phone */}
              {m.phone && (
                <div className="text-sm text-gray-600 mt-3">{m.phone}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
