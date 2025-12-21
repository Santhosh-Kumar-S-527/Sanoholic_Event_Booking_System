import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch(() => alert("Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-gray-400">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-10">
        Admin <span className="text-green-400">Analytics</span>
      </h1>

      {/* KPI CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Users" value={stats.totalUsers} />
        <StatCard title="Organizers" value={stats.totalOrganizers} />
        <StatCard title="Events" value={stats.totalEvents} />
        <StatCard title="Bookings" value={stats.totalBookings} />
      </div>

      {/* TOP EVENTS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-400">
          Top Booked Events
        </h2>

        {stats.topEvents.length === 0 ? (
          <p className="text-gray-400">No bookings yet</p>
        ) : (
          <ul className="space-y-3">
            {stats.topEvents.map((e, index) => (
              <li
                key={index}
                className="flex justify-between bg-slate-950 p-3 rounded"
              >
                <span>{e.title}</span>
                <span className="text-gray-400">
                  {e.bookings} bookings
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      className="
        bg-slate-900
        border border-slate-800
        rounded-xl
        p-6
        text-center
        hover:border-green-400
        transition
      "
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}
