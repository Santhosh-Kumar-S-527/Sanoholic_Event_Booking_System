import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import API from "../utils/api";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, statsRes] = await Promise.all([
          API.get(`/events/${id}`),
          API.get(`/events/${id}/stats`),
        ]);
        setEvent(eventRes.data);
        setSeats(statsRes.data);
      } catch (err) {
        console.error("Failed to load event", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBooking = async () => {
    try {
      await API.post("/bookings", { eventId: id });
      setSuccess(true);
      setTimeout(() => navigate("/bookings"), 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    );
  }

  const seatsLeft = seats.remaining;
  const isFull = seatsLeft === 0;
  const isUser = user?.role === "user";

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          {event.title}
        </h1>

        <p className="text-gray-400 mb-4">
          {event.date} • {event.location}
        </p>

        <p className="text-gray-300 mb-6">{event.description}</p>

        <p className="text-gray-400 mb-4">
          Seats left: <span className="text-gray-200">{seatsLeft}</span>
        </p>

        {/* 🚫 ORGANIZER / ADMIN BLOCK */}
        {!isUser && (
          <p className="text-yellow-400 text-sm">
            Only users can book events
          </p>
        )}

        {isUser && (
          <button
            onClick={handleBooking}
            disabled={isFull || success}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isFull || success
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-green-500 text-black hover:bg-green-400"
            }`}
          >
            {isFull ? "Event Full" : success ? "Booked" : "Book Now"}
          </button>
        )}
      </div>
    </div>
  );
}
