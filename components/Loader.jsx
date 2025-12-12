"use client";

import Lottie from "lottie-react";
import animationData from "../public/lottie/lion-loader.json";
import { usePageLoader } from "../app/PageLoaderContext";

export default function Loader() {
  const { loading } = usePageLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-[9999]">
      <div className="w-40 h-40">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}
