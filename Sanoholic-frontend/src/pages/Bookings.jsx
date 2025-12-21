import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await API.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  /* 🔄 LOADING */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-gray-400 text-lg animate-pulse">
          Loading your bookings...
        </p>
      </div>
    );
  }

  /* 🚫 EMPTY STATE */
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-gray-300">
        <p className="text-4xl mb-4">😕</p>
        <p className="text-xl font-semibold">No bookings yet</p>
        <p className="text-sm text-gray-500 mt-1">
          Discover events and book your experience
        </p>
      </div>
    );
  }

  /* ✅ BOOKINGS LIST */
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-white mb-10">
        My <span className="text-green-400">Bookings</span>
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="
              bg-slate-900/80
              border border-slate-800
              backdrop-blur-md
              rounded-xl
              p-5
              flex flex-col sm:flex-row
              justify-between
              items-start sm:items-center
              gap-4
              shadow-lg
              hover:shadow-green-500/10
              transition-all
            "
          >
            {/* 📌 EVENT INFO */}
            <div>
              <h2 className="text-lg font-semibold text-white">
                {b.event?.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {b.event?.date} • {b.event?.location}
              </p>
            </div>

            {/* ❌ CANCEL BUTTON */}
            <button
              onClick={() => handleCancel(b._id)}
              className="
                px-4 py-1.5
                rounded-md
                bg-red-500/90
                text-white
                text-sm
                font-medium
                hover:bg-red-600
                transition
              "
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
