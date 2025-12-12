"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Link from "next/link";
import Protected from "../../../components/admin/Protected";
import { ROLES } from "../../../components/admin/roles";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [role, setRole] = useState("All");

  const loadMembers = async () => {
    try {
      const res = await api.get("/members");
      setMembers(res.data);
    } catch (err) {
      console.log("Error loading members:", err);
    }
  };

  const deleteMember = async (id) => {
    if (!confirm("Delete this member?")) return;

    await api.delete(`/members/${id}`);
    loadMembers();
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // FILTER LOGIC
  const filteredMembers = members.filter((m) =>
    role === "All" ? true : m.role === role
  );

  return (
    <Protected>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Members</h1>

        <Link
          href="/admin/members/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Member
        </Link>
      </div>

      {/* ROLE FILTER */}
      <div className="mb-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Photo</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Phone</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((m) => (
              <tr key={m._id} className="border-t">
                <td className="p-3">
                  <img
                    src={m.photo}
                    className="w-14 h-14 rounded object-cover border"
                  />
                </td>
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.role}</td>
                <td className="p-3">{m.phone}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/members/edit/${m._id}`}
                    className="text-blue-600 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMember(m._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Protected>
  );
}
