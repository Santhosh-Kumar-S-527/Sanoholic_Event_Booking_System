import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function AdminBookingsByUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/bookings/users")
      .then((res) => setData(res.data))
      .catch(() => alert("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;
    await API.delete(`/admin/bookings/${id}`);
    setData((prev) =>
      prev.map((u) => ({
        ...u,
        bookings: u.bookings.filter((b) => b._id !== id),
      }))
    );
  };

  if (loading) return <p className="text-center mt-20 text-gray-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Bookings by Users</h1>

      {data.map((user) => (
        <div key={user.userId} className="mb-8">
          <h2 className="text-lg font-semibold text-green-400">
            {user.name} ({user.email})
          </h2>

          {user.bookings.length === 0 ? (
            <p className="text-gray-500 mt-2">No bookings</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {user.bookings.map((b) => (
                <li
                  key={b._id}
                  className="bg-slate-900 p-3 rounded flex justify-between"
                >
                  <span>
                    {b.event?.title} — {b.event?.location}
                  </span>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
