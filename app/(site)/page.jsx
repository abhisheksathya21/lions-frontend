"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";

import HeroBanner from "../../components/HeroBanner";
import AboutSection from "../../components/AboutSection"; // your existing - OK to keep
import MemberHighlights from "../../components/MemberHighlights";
import EventsGrid from "../../components/EventsGrid";
import ContactSection from "../../components/ContactSection";
import Skeleton from "../../components/Skeleton";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [about, setAbout] = useState(null);
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [siteInfo, setSiteInfo] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadAll() {
      try {
        const [bRes, aRes, eRes, mRes, sRes] = await Promise.all([
          api.get("/banners"),
          api.get("/about"),
          api.get("/events"),
          api.get("/members"),
          api.get("/siteinfo"),
        ]);
        if (!mounted) return;
        setBanners(bRes.data || []);
        setAbout(aRes.data || null);
        setEvents(eRes.data || []);
        setMembers(mRes.data || []);
        setSiteInfo(sRes.data || null);
      } catch (err) {
        console.error("Home load error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadAll();
    return () => (mounted = false);
  }, []);

  // Pick hero banner (first) and show about subtitle if available
  const heroBanner = banners[0] || null;
  const upcoming = events.slice(0, 3);

  return (
    <>
      {/* Hero */}
      {loading && !heroBanner ? (
        <div className="w-full">
          <Skeleton className="w-full h-[60vh] md:h-[80vh]" />
        </div>
      ) : (
       <HeroBanner banners={banners} about={about} />

      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 -mt-10">
        {/* About */}
        {loading && !about ? <Skeleton className="h-40 w-full my-8" /> : <AboutSection about={about} />}

        {/* Member Highlights */}
        <MemberHighlights members={members} loading={loading} />

        {/* Events */}
        <EventsGrid events={upcoming} loading={loading} />

        {/* Contact */}
        <ContactSection info={siteInfo} />
      </main>
    </>
  );
}
