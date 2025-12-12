"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/members", label: "Members" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${scrolled 
        ? "bg-[#0C2340]/80 backdrop-blur-xl shadow-lg" 
        : "bg-[#0C2340]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
         <div className="w-12 h-12 flex items-center justify-center">
  <img
    src="/lions-badge.png"
    alt="Lions Club Logo"
    className="w-full h-full object-contain drop-shadow-md"
  />
</div>

          <span className="text-xl font-bold text-white tracking-wide">
            Lions Club
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-lg font-medium transition-all relative pb-1
                  ${isActive ? "text-[#F5A623]" : "text-white hover:text-[#F5A623]"}
                `}
              >
                {link.label}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#F5A623] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`
        md:hidden bg-[#0C2340] overflow-hidden transition-all duration-300
        ${open ? "max-h-60 py-4" : "max-h-0 py-0"}
      `}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`
                px-6 py-3 text-lg block border-b border-white/10
                transition-all
                ${isActive ? "text-[#F5A623] bg-white/10" : "text-white"}
              `}
            >
              {link.label}
            </Link>
          );
        })}

        {/* MOBILE CTA BUTTON */}
        <Link
          href="/contact"
          className="mx-6 mt-4 mb-2 block text-center bg-[#F5A623] text-[#0C2340] font-semibold py-2 rounded-md shadow-md hover:scale-105 transition"
        >
          Join Us
        </Link>
      </div>
    </nav>
  );
}
