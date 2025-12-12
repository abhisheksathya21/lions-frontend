"use client";

import { useState } from "react";
import api from "../../../../lib/api";
import { useRouter } from "next/navigation";
import Protected from "../../../../components/admin/Protected";
import Swal from "sweetalert2";
import { ROLES } from "../../../../components/admin/roles";
export default function CreateMember() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("role", form.role);
    data.append("phone", form.phone);
    data.append("photo", photo);

    try {
      await api.post("/members", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success!", "Member added successfully.", "success");

      router.push("/admin/members");
    } catch (err) {
      Swal.fire("Error!", "Error adding member", "success");

      console.log(err);
    }
  };

  return (
    <Protected>
      <div className="max-w-lg mx-auto bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Add Member</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />
          <label className="font-medium">Role</label>
          <select
            name="role"
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          >
            <option value="">Select Role</option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <input
            name="phone"
            type="text"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />

          {/* Image Upload */}
          <label className="block font-medium mb-2">Profile Photo</label>
          <input type="file" accept="image/*" onChange={handleImage} />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 mt-3 rounded object-cover border"
            />
          )}

          <button
            className="w-full bg-blue-600 text-white mt-4 py-2 rounded hover:bg-blue-700"
          >
            Add Member
          </button>
        </form>
      </div>
    </Protected>
  );
}
