import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      await API.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-gray-400">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Admin <span className="text-green-400">Users</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-slate-800 rounded-lg overflow-hidden">
          <thead className="bg-slate-900">
            <tr className="text-left text-sm text-gray-400">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Joined</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-slate-800 hover:bg-slate-900/60 transition"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3 text-sm text-gray-400">
                  {user.email}
                </td>
                <td className="p-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === "admin"
                        ? "bg-red-500/20 text-red-400"
                        : user.role === "organizer"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
