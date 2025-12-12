"use client";
import Protected from "../../../components/admin/Protected";
import { useEffect, useState } from "react";
import api from "../../../lib/api";

function EventForm({ onSaved, editing }) {
  const [form, setForm] = useState(
    editing || { title: "", date: "", description: "" }
  );

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(editing?.image || null);

  useEffect(() => {
    setForm(editing || { title: "", date: "", description: "" });
    setPreview(editing?.image || null);
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("date", form.date);
    data.append("description", form.description);

    if (image) data.append("image", image);

    try {
      if (editing?._id) {
        await api.put(`/events/${editing._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/events`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSaved();
    } catch (err) {
      alert("Failed to save");
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow grid gap-3">
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="border p-2 rounded"
        required
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="border p-2 rounded"
        required
      />

      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
        className="border p-2 rounded"
      />

      {/* IMAGE UPLOAD */}
      <label className="font-medium">Event Image</label>
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
          className="w-40 h-28 object-cover border rounded mt-2"
        />
      )}

      <button className="bg-blue-600 text-white py-2 rounded">
        {editing ? "Update" : "Create"}
      </button>
    </form>
  );
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(()=>{
    api.get("/events").then(r=>setEvents(r.data)).catch(()=>alert("Failed to fetch events"));
  }, [refreshKey]);

  const remove = async (id)=> {
    if (!confirm("Delete event?")) return;
    await api.delete(`/events/${id}`);
    setRefreshKey(k=>k+1);
  };

  return (
    <Protected>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create / Edit Event</h2>
          <EventForm editing={editing} onSaved={()=>{setEditing(null); setRefreshKey(k=>k+1)}} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Events</h2>
          <div className="space-y-4">
            {events.map(ev => (
  <div
    key={ev._id}
    className="p-4 bg-white rounded shadow flex justify-between items-start"
  >
    <div className="flex gap-4">
      {ev.image && (
        <img
          src={ev.image}
          className="w-20 h-16 rounded object-cover border"
        />
      )}

      <div>
        <div className="font-semibold">{ev.title}</div>
        <div className="text-sm text-gray-600">{ev.date}</div>
      </div>
    </div>

    <div className="flex gap-2">
      <button
        onClick={() => setEditing(ev)}
        className="px-3 py-1 border rounded"
      >
        Edit
      </button>
      <button
        onClick={() => remove(ev._id)}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Delete
      </button>
    </div>
  </div>
))}


            
          </div>
        </div>
      </div>
    </Protected>
  );
}
