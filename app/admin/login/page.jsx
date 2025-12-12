"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api, { setAuthToken } from "../../../lib/api";
import { useAdmin } from "../../../components/admin/AuthProvider";

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAdmin();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/admin/login", form);
      const { token, admin } = res.data;
      // set token
      setAuthToken(token);
      login(token, admin);
      router.push("/admin");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={submit} className="grid gap-3">
        <input required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}
          placeholder="Email" className="border p-3 rounded" />
        <input required type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}
          placeholder="Password" className="border p-3 rounded" />
        <button className="bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
