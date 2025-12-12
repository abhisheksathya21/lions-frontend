"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function HeroBanner({ banners = [], about }) {
  const fallbackStyle = {
    background:
      "linear-gradient(135deg, #0C2340 0%, #1E5BA8 60%, rgba(245,166,35,0.12) 100%)",
  };

  const slides = banners.length > 0 ? banners : [{ image: null }];

  return (
    <header className="relative w-full overflow-hidden">

     

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[65vh] md:h-[85vh]"
      >
        {slides.map((b, i) => (
          <SwiperSlide key={i}>
           <div
  className="w-full h-full bg-center bg-cover flex items-center"
  style={b.image ? { backgroundImage: `url(${b.image})` } : fallbackStyle}
>
  <div
    className="w-full h-full flex items-center"
    style={{
      background:
        "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)",
    }}
  >
    {/* LEFT-LOCKED CONTENT */}
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="text-white max-w-xl animate-heroFadeUp space-y-4 md:space-y-6 text-left">

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
          Lions Club —{" "}
          <span className="relative text-[#F5A623]">
            We Serve
            <span className="absolute inset-0 blur-2xl opacity-40 bg-[#F5A623]" />
          </span>
        </h1>

        <p className="text-sm md:text-lg text-white/90">
          {about?.description
            ? about.description.slice(0, 180) +
              (about.description.length > 180 ? "..." : "")
            : "Committed to community service, leadership and compassion."}
        </p>

        <div className="flex gap-3 mt-4">
          <Link
            href="/contact"
            className="relative inline-block px-5 py-2 rounded-md font-semibold text-[#0C2340]
            before:absolute before:inset-0 before:rounded-md before:p-[2px]
            before:bg-gradient-to-r before:from-[#F5A623] before:to-[#FFC857]
            before:-z-10 hover:scale-105 transition"
          >
            Join Us
          </Link>

          <Link
            href="/events"
            className="inline-block px-5 py-2 rounded-md border border-white/30 
                       text-white/95 hover:bg-white/10 transition"
          >
            Upcoming Events
          </Link>
        </div>

      </div>
    </div>
  </div>
</div>

          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
}
