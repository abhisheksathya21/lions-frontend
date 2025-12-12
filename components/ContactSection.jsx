"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import Skeleton from "./Skeleton";

export default function ContactSection({ info: propInfo = null }) {
  const [info, setInfo] = useState(propInfo);
  const [loading, setLoading] = useState(!propInfo);

  useEffect(() => {
    if (propInfo) return;
    let mounted = true;
    async function load() {
      try {
        const res = await api.get("/siteinfo");
        if (mounted) setInfo(res.data);
      } catch (err) {
        console.error("siteinfo error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [propInfo]);

  if (loading && !info) {
    return (
      <section className="my-16">
        <Skeleton className="h-6 w-1/3 mb-3" />
        <Skeleton className="h-6 w-1/4 mb-3" />
        <Skeleton className="h-64 w-full" />
      </section>
    );
  }

  if (!info) {
    return (
      <section className="my-16">
        <div className="bg-white p-6 rounded shadow text-gray-600">Contact information not configured.</div>
      </section>
    );
  }

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-[#0C2340] mb-6">Contact Us</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <p><strong>Address:</strong> {info.address}</p>
          <p><strong>Phone:</strong> {info.phone}</p>
          <p><strong>Email:</strong> {info.email}</p>
          <div className="mt-4">
            {info.facebook && <a className="mr-3" href={info.facebook} target="_blank" rel="noreferrer">Facebook</a>}
            {info.instagram && <a className="mr-3" href={info.instagram} target="_blank" rel="noreferrer">Instagram</a>}
            {info.youtube && <a className="mr-3" href={info.youtube} target="_blank" rel="noreferrer">YouTube</a>}
          </div>
        </div>

        <div className="w-full h-64 rounded overflow-hidden">
          {info.mapEmbed ? (
            <div dangerouslySetInnerHTML={{ __html: info.mapEmbed }} />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">Map not available</div>
          )}
        </div>
      </div>
    </section>
  );
}
