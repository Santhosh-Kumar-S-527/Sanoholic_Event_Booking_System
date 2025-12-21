import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function RoleSelect() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🚀 If already logged in, redirect to home
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-10 w-full max-w-md text-center space-y-8">

        <h1 className="text-3xl font-bold text-gray-100">
          Welcome to <span className="text-green-400">SANOHOLIC</span>
        </h1>

        <p className="text-gray-400">
          Choose how you want to continue
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/login?role=user")}
            className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-400 transition"
          >
            Continue as User
          </button>

          <button
            onClick={() => navigate("/login?role=organizer")}
            className="w-full bg-slate-800 text-gray-200 py-3 rounded-lg hover:bg-slate-700 transition"
          >
            Continue as Organizer
          </button>

          <button
            onClick={() => navigate("/login?role=admin")}
            className="w-full bg-slate-800 text-gray-200 py-3 rounded-lg hover:bg-slate-700 transition"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}
