"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../../lib/api";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading event details...</p>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 py-12">

      {/* BACK BUTTON */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-[#1E5BA8] hover:underline font-medium mb-6"
      >
        ← Back to Events
      </Link>

      {/* EVENT CARD */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        {/* IMAGE SECTION */}
        <div className="relative">
          <img
            src={event.image || "/event-placeholder.jpg"}
            alt={event.title}
            className="w-full h-72 md:h-96 object-cover"
          />

          {/* FLOATING DATE BADGE */}
          <div className="absolute bottom-4 right-4 bg-[#F5A623] text-[#0C2340]
                          px-4 py-2 rounded-lg shadow-lg font-semibold flex items-center gap-2">
            <CalendarDays size={18} />
            {new Date(event.date).toLocaleDateString()}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-8">

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0C2340] leading-snug">
            {event.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-700 mt-6 leading-relaxed text-lg md:text-base">
            {event.description}
          </p>

          {/* OPTIONAL EXTRA INFO SECTION */}
          <div className="mt-10 bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-xl font-semibold text-[#0C2340] mb-2">
              Event Highlights
            </h3>
            <p className="text-gray-600">
              This event is organized by Lions Club as part of our mission to serve,
              empower, and uplift the community. Stay tuned for more updates and
              post-event photos.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
