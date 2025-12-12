"use client";
import { useState } from "react";
import api from "../../../lib/api";  // adjust path if needed
import { useRouter } from "next/navigation";

export default function AdminRegister() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
   
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/register", form);
      alert("Admin registered successfully");
      router.push("/admin/login");
    } catch (error) {
      alert("Error registering admin");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold mb-4">Admin Register</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />

      

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
