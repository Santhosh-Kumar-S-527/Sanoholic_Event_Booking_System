import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Load existing event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setForm({
          title: res.data.title,
          description: res.data.description,
          date: res.data.date,
          location: res.data.location,
          capacity: res.data.capacity,
          price: res.data.price,
        });
      } catch (err) {
        alert("Failed to load event" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/events/${id}`, form);
      navigate("/organizer");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-slate-950 border border-slate-800
                   rounded-xl p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          Edit Event
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
          className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-gray-200"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          rows="3"
          className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-gray-200"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-gray-200"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-gray-200"
        />

        <input
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          placeholder="Capacity"
          required
          className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-gray-200"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-gray-200"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-black py-2 rounded-lg
                     font-semibold hover:bg-green-400 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
