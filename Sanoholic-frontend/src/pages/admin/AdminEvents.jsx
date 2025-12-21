import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      alert("Failed to load events" + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this event permanently?")) return;
    try {
      await API.delete(`/events/${id}`);
      fetchAllEvents();
    } catch {
      alert("Failed to delete event");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-gray-400">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Manage all events across the platform
          </p>
        </div>

        {/* NO EVENTS */}
        {events.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-10 text-center">
            <p className="text-gray-400">No events found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-slate-950 border border-slate-800
                           rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-100 mb-1">
                    {event.title}
                  </h2>

                  <p className="text-gray-400 text-sm mb-2">
                    {event.date} • {event.location}
                  </p>

                  <p className="text-gray-400 text-sm mb-1">
                    Capacity: {event.capacity}
                  </p>

                  <p className="text-gray-400 text-sm mb-3">
                    Price: ₹{event.price}
                  </p>

                  <p className="text-xs text-gray-500">
                    Organizer ID: {event.createdBy}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/organizer/bookings/${event._id}`}
                    className="text-yellow-400 text-sm hover:underline"
                  >
                    View Bookings
                  </Link>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-400 text-sm hover:text-red-300"
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
