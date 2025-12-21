import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function AdminOrganizerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/admin/organizer-requests");
      setRequests(res.data);
    } catch (err) {
      alert("Failed to load organizer requests" + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    if (!confirm("Approve this organizer request?")) return;

    try {
      await API.post(`/admin/organizer-requests/${id}/approve`);
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Reject this organizer request?")) return;

    try {
      await API.post(`/admin/organizer-requests/${id}/reject`);
      fetchRequests();
    } catch {
      alert("Rejection failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-gray-400">Loading organizer requests...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Organizer <span className="text-green-400">Requests</span>
      </h1>

      {requests.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-gray-400">
          No organizer requests found
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* LEFT INFO */}
              <div>
                <h2 className="text-lg font-semibold">
                  {req.name}
                </h2>
                <p className="text-sm text-gray-400">
                  {req.email} • {req.phone}
                </p>
                <p className="text-sm text-gray-400">
                  Organization: {req.organization}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {req.reason}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Requested on{" "}
                  {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-4">
                <StatusBadge status={req.status} />

                {req.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(req._id)}
                      className="bg-green-500/20 text-green-400 px-4 py-1 rounded hover:bg-green-500/30 transition text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-red-500/20 text-red-400 px-4 py-1 rounded hover:bg-red-500/30 transition text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 🔹 STATUS BADGE */
function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-500/20 text-yellow-400",
    approved: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}
