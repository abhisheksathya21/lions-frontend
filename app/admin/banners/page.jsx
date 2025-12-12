"use client";
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Protected from "../../../components/admin/Protected";
import Swal from "sweetalert2";

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);

  async function loadBanners() {
    const res = await api.get("/banners");
    setBanners(res.data);
  }

  useEffect(() => { loadBanners(); }, []);

  const uploadBanner = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", image);

    try {
      setUploading(true);
      await api.post("/banners", data);
      Swal.fire("Success!", "Banner Added.", "success");
      loadBanners();
    } catch (err) {
      Swal.fire("Error!", "Banner upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const removeBanner = async (id) => {
    if (!confirm("Delete this banner?")) return;

    await api.delete(`/banners/${id}`);
    loadBanners();
  };

  return (
    <Protected>
      <h1 className="text-3xl font-bold mb-6">Banner Management</h1>

      {/* Upload Form */}
      <form onSubmit={uploadBanner} className="bg-white p-5 rounded shadow mb-8">
        <label className="font-medium">Upload Banner</label>
        <input type="file" accept="image/*" required onChange={e => setImage(e.target.files[0])} />

        <button
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Banner List */}
      <div className="grid md:grid-cols-2 gap-6">
        {banners.map(b => (
          <div key={b._id} className="bg-white p-4 shadow rounded">
            <img src={b.image} className="w-full h-40 object-cover rounded mb-3" />
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => removeBanner(b._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Protected>
  );
}
