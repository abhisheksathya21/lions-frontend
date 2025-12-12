"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../../lib/api";
import Link from "next/link";

export default function MemberDetail() {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    api.get(`/members/${id}`).then((res) => setMember(res.data));
  }, [id]);

  if (!member)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading member details...
      </p>
    );

  return (
    <section className="max-w-xl mx-auto px-4 py-10">

      {/* Back Button */}
      <Link
        href="/members"
        className="inline-block mb-6 text-[#1E5BA8] font-semibold hover:underline"
      >
        ← Back to Members
      </Link>

      {/* Glass Card */}
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 
                      p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition">

        {/* Profile Image */}
        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden 
                        border-4 border-white shadow-md">
          <img
            src={member.photo || "/placeholder-profile.png"}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold mt-4 text-[#0C2340]">
          {member.name}
        </h1>

        {/* Role */}
        <p className="mt-2 text-sm font-medium px-4 py-1 rounded 
                      bg-[#FFF4E6] text-[#8A4B00] inline-block">
          {member.role}
        </p>

        {/* Phone */}
        {member.phone && (
          <p className="mt-3 text-[#1E5BA8] font-semibold text-lg">
            📞 {member.phone}
          </p>
        )}

        {/* Additional Section */}
        <div className="mt-6 text-gray-700 leading-relaxed">
          This member is an active contributor to Lions Club initiatives,
          supporting community programs and participating in service activities.
        </div>
      </div>
    </section>
  );
}
