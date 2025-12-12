"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export default function GlobalBreadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const parts = pathname.split("/").filter(Boolean);
  let fullPath = "";

  return (
    <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-lg shadow-sm px-4 py-2 mb-6">
      <div className="flex items-center gap-2 text-sm text-gray-700">

        {/* Home Link */}
        <Link href="/" className="flex items-center gap-1 hover:text-blue-700">
          <Home size={16} />
          Home
        </Link>

        {parts.map((part, i) => {
          fullPath += "/" + part;
          const isLast = i === parts.length - 1;

          return (
            <div key={i} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-gray-400" />

              {isLast ? (
                <span className="font-semibold text-gray-900">
                  {part}
                </span>
              ) : (
                <Link href={fullPath} className="hover:text-blue-700">
                  {part}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
