"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Protected from "../../../components/admin/Protected";
import Swal from "sweetalert2";

export default function AdminAbout() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    mission: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Load existing data
  useEffect(() => {
    api.get("/about").then((res) => {
      if (res.data) {
        setForm({
          title: res.data.title,
          description: res.data.description,
          mission: res.data.mission
        });
        setPreview(res.data.image);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("mission", form.mission);
    if (image) data.append("image", image);

    try {
      await api.put("/about", data);
      Swal.fire("Success", "About section updated!", "success");
    } catch (err) {
      Swal.fire("Error", "Update failed!", "error");
    }
  };

  return (
    <Protected>
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">About Section</h1>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            type="text"
            value={form.title}
            placeholder="Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />

          <textarea
            value={form.description}
            placeholder="Club History / About"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded w-full h-32"
            required
          ></textarea>

          <textarea
            value={form.mission}
            placeholder="Mission Statement"
            onChange={(e) => setForm({ ...form, mission: e.target.value })}
            className="border p-2 rounded w-full h-24"
          ></textarea>

          <label className="font-semibold">Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {preview && (
            <img
              src={preview}
              className="w-40 mt-3 rounded border object-cover"
            />
          )}

          <button className="bg-blue-600 text-white p-2 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </Protected>
  );
}
