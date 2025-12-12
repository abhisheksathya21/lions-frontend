"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { FaFacebook, FaInstagram, FaYoutube, FaGlobe } from "react-icons/fa";

export default function Footer() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get("/siteinfo").then((res) => setInfo(res.data));
  }, []);

  if (!info) return null;

  return (
    <footer className="bg-[#0C2340] text-white mt-24 pt-16 pb-10">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* CONTACT */}
        <div>
          <h3 className="text-2xl font-bold text-[#F5A623] mb-3">
            Contact Us
          </h3>
          <p className="text-gray-300">{info.address}</p>
          <p className="mt-2 text-gray-300">📞 {info.phone}</p>
          <p className="mt-1 text-gray-300">✉️ {info.email}</p>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-2xl font-bold text-[#F5A623] mb-3">Follow Us</h3>
 <p className="mt-1 text-gray-300">   <a
                href="https://www.instagram.com/lions__kayalpalla?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                className="hover:text-[#F5A623] hover:scale-110 transition"
              >
                <FaInstagram />
                Instagram
              </a></p>
          <div className="flex gap-5 text-3xl">
            {info.facebook && (
              <a
                href={info.facebook}
                target="_blank"
                className="hover:text-[#F5A623] hover:scale-110 transition"
              >
                <FaFacebook />
              </a>
            )}

            {info.instagram && (
              <a
                href={info.instagram}
                target="_blank"
                className="hover:text-[#F5A623] hover:scale-110 transition"
              >
                <FaInstagram />
              </a>
            )}

            {info.youtube && (
              <a
                href={info.youtube}
                target="_blank"
                className="hover:text-[#F5A623] hover:scale-110 transition"
              >
                <FaYoutube />
              </a>
            )}

            {info.website && (
              <a
                href={info.website}
                target="_blank"
                className="hover:text-[#F5A623] hover:scale-110 transition"
              >
                <FaGlobe />
              </a>
            )}
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="text-2xl font-bold text-[#F5A623] mb-3">
            Lions Club
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Serving our community with leadership, commitment, and compassion.
            Join us and be part of meaningful change.
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-gray-400 text-sm mt-12 border-t border-white/10 pt-4">
        © {new Date().getFullYear()} Lions Club — All Rights Reserved.
      </div>
    </footer>
  );
}
