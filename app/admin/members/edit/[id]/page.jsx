"use client";

import { useEffect, useState } from "react";
import api from "../../../../../lib/api";
import { useRouter, useParams } from "next/navigation";
import Protected from "../../../../../components/admin/Protected";
import Swal from "sweetalert2";
import { ROLES } from "../../../../../components/admin/roles";

export default function EditMember() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  // Load existing member data
 useEffect(() => {
  async function loadMember() {
    try {
      const res = await api.get(`/members/${id}`);
      const member = res.data;

      setForm({
        name: member.name,
        role: member.role,
        phone: member.phone,
      });

      setPreview(member.photo);
    } catch (err) {
      console.log("Failed to load member:", err);
    }
  }

  loadMember();
}, [id]);


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
    if (photo) data.append("photo", photo);

    try {
      await api.put(`/members/${id}`, data);
       Swal.fire("Success!", "Member Updated successfully.", "success");
      router.push("/admin/members");
    } catch (err) {
      console.log(err);
       Swal.fire("Error!", "Error updating member", "success");
      
    }
  };

  return (
    <Protected>
      <div className="max-w-lg mx-auto bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Edit Member</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            type="text"
            placeholder="Name"
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

        <label className="font-medium">Role</label>
<select
  name="role"
  value={form.role}
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
            value={form.phone}
            type="text"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />

          <label className="block font-medium mb-2">Profile Photo</label>
          <input type="file" accept="image/*" onChange={handleImage} />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 mt-3 rounded object-cover border"
            />
          )}

          <button className="w-full bg-blue-600 text-white mt-4 py-2 rounded">
            Update Member
          </button>
        </form>
      </div>
    </Protected>
  );
}
