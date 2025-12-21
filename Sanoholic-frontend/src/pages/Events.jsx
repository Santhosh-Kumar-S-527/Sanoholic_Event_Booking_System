import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((event) => {
      if (type === "free") return event.price === 0;
      if (type === "paid") return event.price > 0;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      return new Date(a.date) - new Date(b.date);
    });

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-20">
        Loading events...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-100 mb-10 text-center">
        Explore Events
      </h1>

      {/* FILTERS */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 mb-12">
        <input
          placeholder="Search events"
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800
                     text-gray-200 placeholder-gray-500
                     px-4 py-2 rounded-lg focus:outline-none
                     focus:ring-1 focus:ring-green-400"
        />

        <select
          onChange={(e) => setType(e.target.value)}
          className="bg-slate-950 border border-slate-800
                     text-gray-200 px-4 py-2 rounded-lg
                     focus:outline-none focus:ring-1
                     focus:ring-green-400"
        >
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-slate-950 border border-slate-800
                     text-gray-200 px-4 py-2 rounded-lg
                     focus:outline-none focus:ring-1
                     focus:ring-green-400"
        >
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* EVENTS GRID */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredEvents.map((event) => {
          const bookedCount = bookings.filter(
            (b) => b.id === event._id
          ).length;

          const seatsLeft = event.capacity - bookedCount;
          const isFull = seatsLeft <= 0;

          return (
            <div
              key={event._id}
              className="relative bg-slate-950 border border-slate-800
                         p-6 rounded-xl shadow-sm
                         hover:shadow-lg hover:-translate-y-1
                         transition-all duration-300"
            >
              {/* BADGES */}
              <div className="absolute top-4 right-4 flex gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium
                    ${
                      event.price === 0
                        ? "bg-green-500/10 text-green-400"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                >
                  {event.price === 0 ? "FREE" : "PAID"}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium
                    ${
                      isFull
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                >
                  {isFull ? "FULL" : `${seatsLeft} Seats`}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {event.title}
              </h3>

              <p className="text-gray-400 text-sm mb-1">
                📅 {event.date}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                📍 {event.location}
              </p>

              <div className="flex justify-between items-center">
                <p className="font-semibold text-green-400">
                  {event.price === 0 ? "Free" : `₹${event.price}`}
                </p>

                <Link
                  to={`/events/${event._id}`}
                  className="text-sm px-4 py-1.5 rounded-lg
                             bg-slate-800 text-gray-200
                             hover:bg-green-500 hover:text-black
                             transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          No events found
        </p>
      )}
    </div>
  );
}
