import { useState, useContext } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import API from "../utils/api";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const [params] = useSearchParams();
  const role = params.get("role"); // user | organizer | admin

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      login(res.data.token);

      if (res.data.mustChangePassword) {
        navigate("/change-password");
        return;
      }

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "organizer") navigate("/organizer");
      else navigate("/home");
    } catch (err) {
      if (err.response?.status === 403) {
        alert("Your organizer request is pending admin approval");
      } else {
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-950 border border-slate-800 rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
          {role === "organizer"
            ? "Organizer Login"
            : role === "admin"
            ? "Admin Login"
            : "User Login"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-slate-900 text-gray-200 border border-slate-700"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 rounded bg-slate-900 text-gray-200 border border-slate-700"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded font-semibold transition">
          Login
        </button>

        {role === "user" && (
          <p className="text-sm text-gray-400 mt-4 text-center">
            New user?{" "}
            <Link to="/register" className="text-green-400 hover:underline">
              Register here
            </Link>
          </p>
        )}

        {role === "organizer" && (
          <p className="text-sm text-gray-400 mt-4 text-center">
            New organizer?{" "}
            <Link
              to="/register?role=organizer"
              className="text-green-400 hover:underline"
            >
              Request access
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
