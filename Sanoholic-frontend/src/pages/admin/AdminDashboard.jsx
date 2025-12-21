import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-10">
        Admin <span className="text-green-400">Panel</span>
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminCard
          title="Events"
          desc="View and delete all events"
          onClick={() => navigate("/admin/events")}
        />

        <AdminCard
          title="Bookings"
          desc="View bookings by event or user"
          onClick={() => navigate("/admin/bookings")}
        />

        <AdminCard
          title="Users"
          desc="View and manage all users"
          onClick={() => navigate("/admin/users")}
        />

        <AdminCard
          title="Analytics"
          desc="View platform statistics and insights"
          onClick={() => navigate("/admin/analytics")}
        />

        <AdminCard
          title="Organizer Requests"
          desc="Approve or reject organizer applications"
          onClick={() => navigate("/admin/organizer-requests")}
        />

      </div>
    </div>
  );
}

function AdminCard({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        bg-slate-900
        border border-slate-800
        rounded-xl
        p-6
        cursor-pointer
        hover:border-green-400
        hover:shadow-lg
        hover:shadow-green-500/10
        transition-all
      "
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
