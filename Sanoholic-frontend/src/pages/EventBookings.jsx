import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

export default function EventBookings() {
  const { id } = useParams(); // event id
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get(`/bookings/event/${id}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings", err);
        alert("Unable to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-gray-400">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-100">
            Event Bookings
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-gray-200"
          >
            ← Back
          </button>
        </div>

        {/* NO BOOKINGS */}
        {bookings.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-10 text-center">
            <p className="text-gray-400">
              No bookings for this event yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, index) => (
              <div
                key={b._id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-100">
                    {index + 1}. {b.user.name}
                  </h2>

                  <span className="text-xs text-gray-500">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  📧 {b.user.email}
                </p>

                <p className="text-gray-400 text-sm">
                  📞 {b.user.phone}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
