"use client";
import Protected from "../../components/admin/Protected";

export default function AdminDashboard() {
  return (
    <Protected>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-semibold">Events</h3>
          <p className="mt-2">Create / edit / delete events</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-semibold">Members</h3>
          <p className="mt-2">Manage members</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-semibold">Site</h3>
          <p className="mt-2">Other settings</p>
        </div>
      </div>
    </Protected>
  );
}
