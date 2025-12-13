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
  <footer className="bg-black text-white mt-24 pt-16 pb-10">


      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* CONTACT */}
        <div>
          <h3 className="text-2xl font-bold text-[#F5A623] mb-3">
            Contact Us
          </h3>
         <p className="text-gray-400">{info.address}</p>
<p className="mt-2 text-gray-400">📞 {info.phone}</p>
<p className="mt-1 text-gray-400">✉️ {info.email}</p>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-2xl font-bold text-[#F5A623] mb-3">Follow Us</h3>
 <p className="flex items-center gap-2 text-gray-300 
           hover:text-[#F5A623] hover:translate-x-1
           transition-all duration-200"
>
  <a
    href="https://www.instagram.com/lions__kayalpalla?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    target="_blank"
    className="flex items-center gap-2 text-gray-300 
               hover:text-[#F5A623] transition"
  >
    <FaInstagram className="text-lg" />
    <span>Instagram</span>
  </a>
</p>

          
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="text-2xl font-bold text-[#F5A623] mb-3">
            Lions Club
          </h3>
        <p className="text-gray-400 leading-relaxed">

            Serving our community with leadership, commitment, and compassion.
            Join us and be part of meaningful change.
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
     <div className="text-center text-gray-500 text-sm mt-12 border-t border-white/10 pt-4">

        © {new Date().getFullYear()} Lions Club — All Rights Reserved.
      </div>
    </footer>
  );
}
