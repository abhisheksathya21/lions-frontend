"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../public/lottie/lion-loader.json";
import { usePageLoader } from "../app/PageLoaderContext";

export default function Loader() {
  const { loading } = usePageLoader();
  const [visible, setVisible] = useState(loading);

  useEffect(() => {
    if (loading) {
      setVisible(true);
    } else {
      // Allow exit animation before unmount
      const timeout = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        backdrop-blur-md
        transition-all duration-300 ease-out
        ${loading ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        bg-white/80
      `}
    >
      <div className="w-36 h-36 md:w-40 md:h-40">
        <Lottie animationData={animationData} loop />
      </div>
    </div>
  );
}
