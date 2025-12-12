"use client";
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Protected from "../../../components/admin/Protected";
import Swal from "sweetalert2";

export default function SiteInfoAdmin() {
  const [info, setInfo] = useState({
    address: "",
    phone: "",
    email: "",
    mapEmbed: ""
  });

  useEffect(() => {
    async function loadInfo() {
      const res = await api.get("/siteinfo");
      if (res.data) setInfo(res.data);
    }
    loadInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/siteinfo", info);
      Swal.fire("Success", "Contact info updated!", "success");
    } catch {
      Swal.fire("Error", "Failed to update", "error");
    }
  };

  return (
    <Protected>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Update Contact Information</h1>

        <form onSubmit={handleSubmit} className="grid gap-3">

          <input
            className="border p-2 rounded"
            placeholder="Address"
            value={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Phone"
            value={info.phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Email"
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
          />
          <input
  className="border p-2 rounded"
  placeholder="Facebook URL"
  value={info.facebook || ""}
  onChange={(e) => setInfo({ ...info, facebook: e.target.value })}
/>

<input
  className="border p-2 rounded"
  placeholder="Instagram URL"
  value={info.instagram || ""}
  onChange={(e) => setInfo({ ...info, instagram: e.target.value })}
/>

<input
  className="border p-2 rounded"
  placeholder="YouTube URL"
  value={info.youtube || ""}
  onChange={(e) => setInfo({ ...info, youtube: e.target.value })}
/>

<input
  className="border p-2 rounded"
  placeholder="Website URL"
  value={info.website || ""}
  onChange={(e) => setInfo({ ...info, website: e.target.value })}
/>

          <textarea
            className="border p-2 rounded"
            placeholder="Google Map Iframe Embed Code"
            value={info.mapEmbed}
            rows={4}
            onChange={(e) => setInfo({ ...info, mapEmbed: e.target.value })}
          />

          <button className="bg-blue-600 text-white py-2 rounded">
            Save
          </button>
        </form>
      </div>
    </Protected>
  );
}
