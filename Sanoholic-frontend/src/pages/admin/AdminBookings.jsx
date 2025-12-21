import { useNavigate } from "react-router-dom";

export default function AdminBookings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-10">
        Admin <span className="text-green-400">Bookings</span>
      </h1>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
        <div
          onClick={() => navigate("/admin/bookings/events")}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6
                     cursor-pointer hover:border-green-400 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Grouped by Events
          </h2>
          <p className="text-gray-400 text-sm">
            View all bookings event-wise
          </p>
        </div>

        <div
          onClick={() => navigate("/admin/bookings/users")}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6
                     cursor-pointer hover:border-green-400 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Grouped by Users
          </h2>
          <p className="text-gray-400 text-sm">
            View all bookings user-wise
          </p>
        </div>
      </div>
    </div>
  );
}
