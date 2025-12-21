import { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    try {
      const res = await API.get("/events/my");
      setEvents(res.data);
    } catch (err) {
      alert("Failed to load your events" + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      await API.delete(`/events/${id}`);
      fetchMyEvents();
    } catch {
      alert("Failed to delete event");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">
            Organizer Dashboard
          </h1>

          <Link
            to="/organizer/create"
            className="bg-green-500 text-black px-4 py-2 rounded-lg
                       hover:bg-green-400 transition"
          >
            + Create Event
          </Link>
        </div>

        {/* NO EVENTS */}
        {events.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800
                          rounded-xl p-10 text-center">
            <p className="text-gray-400 mb-4">
              You haven’t created any events yet.
            </p>
            <Link
              to="/organizer/create"
              className="text-green-400 hover:underline"
            >
              Create your first event →
            </Link>
          </div>
        ) : (
          /* EVENTS LIST */
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-slate-950 border border-slate-800
                           rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-gray-100 mb-1">
                  {event.title}
                </h2>

                <p className="text-gray-400 text-sm mb-2">
                  {event.date} • {event.location}
                </p>

                <p className="text-gray-400 text-sm mb-4">
                  Capacity: {event.capacity}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Price: ₹{event.price}
                  </span>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
