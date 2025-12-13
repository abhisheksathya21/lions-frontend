"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function HeroBanner({ banners = [], about }) {
  const fallbackStyle = {
    background:
      "linear-gradient(135deg, #0C2340 0%, #1E5BA8 60%, rgba(245,166,35,0.15) 100%)",
  };

  const slides = banners.length ? banners : [{ image: null }];

  return (
    <header className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3800, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[70vh] md:h-[88vh]"
      >
        {slides.map((b, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative w-full h-full bg-center bg-cover flex items-center"
              style={b.image ? { backgroundImage: `url(${b.image})` } : fallbackStyle}
            >
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.2) 100%)",
                }}
              />

              {/* CONTENT */}
              <div className="relative z-10 w-full px-5 sm:px-8 md:px-14 lg:px-24">
                <div className="max-w-xl text-white space-y-4 md:space-y-6 animate-heroFadeUp">

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-xl">
                    Lions Club —{" "}
                    <span className="relative text-[#F5A623]">
                      We Serve
                      <span className="absolute inset-0 blur-2xl opacity-40 bg-[#F5A623]" />
                    </span>
                  </h1>

                  {/* Accent line */}
                  <div className="w-14 h-[3px] bg-[#F5A623] rounded-full" />

                  {/* Trust line */}
                  <p className="text-[11px] md:text-xs uppercase tracking-widest text-[#F5A623]/90">
                    Lions International • Community Service • Leadership
                  </p>

                  {/* Description */}
                  <p className="text-sm md:text-lg text-white/90 leading-relaxed">
                    {about?.description
                      ? about.description.slice(0, 160) +
                        (about.description.length > 160 ? "..." : "")
                      : "Committed to community service, leadership and compassion."}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href="/contact"
                      className="
                        relative inline-flex items-center justify-center
                        px-6 py-2.5 rounded-md font-semibold
                        text-[#0C2340]
                        before:absolute before:inset-0 before:rounded-md before:p-[2px]
                        before:bg-gradient-to-r before:from-[#F5A623] before:to-[#FFC857]
                        before:-z-10
                        shadow-lg hover:shadow-xl hover:scale-105 transition-all
                      "
                    >
                      Join Us
                    </Link>

                    <Link
                      href="/events"
                      className="
                        inline-flex items-center justify-center
                        px-5 py-2.5 rounded-md
                        border border-white/30
                        text-white/95
                        hover:bg-white/10 transition
                      "
                    >
                      Upcoming Events
                    </Link>
                  </div>
                </div>
              </div>

              {/* Scroll hint */}
              <div className="absolute bottom-6 left-6 text-white/70 text-xs animate-bounce">
                Scroll ↓
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
}
