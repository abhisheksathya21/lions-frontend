"use client";
import Link from "next/link";
import { useAdmin } from "./AuthProvider";

export default function AdminNav() {
  const { admin, logout } = useAdmin();
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="font-bold text-lg">Lions Club — Admin</div>
        <div className="flex gap-4">
          <Link className="hover:text-blue-200" href="/admin">Dashboard</Link>
          <Link className="hover:text-blue-200" href="/admin/events">Events</Link>
          <Link className="hover:text-blue-200" href="/admin/members">Members</Link>
           <Link className="hover:text-blue-200" href="/admin/banners">Banners</Link>
            <Link className="hover:text-blue-200" href="/admin/site-info">Site-Info</Link>
             <Link className="hover:text-blue-200" href="/admin/about">About</Link>

          {admin ? (
            <button onClick={logout} className="ml-4 bg-white text-blue-900 px-3 py-1 rounded">Logout</button>
          ) : (
            <Link href="/admin/login" className="ml-4">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
