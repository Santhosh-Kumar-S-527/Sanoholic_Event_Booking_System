import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* LOGO */}
        <Link
          to={token ? "/home" : "/"}
          className="text-xl font-bold text-gray-100 hover:text-green-400 transition"
        >
          🟢 SANOHOLIC
        </Link>


        {/* 🔓 PUBLIC LINKS (NOT LOGGED IN)
        {!token && (
          <div className="flex gap-6 items-center text-sm">
            <Link to="/login" className="text-gray-300 hover:text-green-400">
              Login
            </Link>

            <Link to="/register" className="text-gray-300 hover:text-green-400">
              Register
            </Link>

            <Link
              to="/register?role=organizer"
              className="text-green-400 font-semibold hover:underline"
            >
              Become Organizer
            </Link>
          </div>
        )} */}

        {/* 🔐 LOGGED-IN LINKS */}
        {token && user && (
          <div className="flex items-center gap-6 text-sm">

            {/* NAV LINKS */}
            <Link to="/home" className="text-gray-300 hover:text-green-400">
              Home
            </Link>

            <Link to="/events" className="text-gray-300 hover:text-green-400">
              Events
            </Link>

            {(user.role === "organizer" || user.role === "admin") && (
              <Link
                to="/organizer"
                className="text-gray-300 hover:text-green-400"
              >
                Dashboard
              </Link>
            )}

            {user.role === "admin" && (
              <Link
                to="/admin"
                className="text-green-400 font-semibold"
              >
                Admin Panel
              </Link>
            )}

            {/* WELCOME */}
            <span className="text-gray-300">
              Welcome,{" "}
              <span className="text-green-400 font-semibold">
                {user.name}
              </span>
            </span>

            {/* AVATAR */}
            <div className="relative">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.name}`
                }
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full cursor-pointer border border-slate-700"
              />

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 top-12 bg-slate-900 border border-slate-800 rounded-lg w-40 shadow-lg z-50">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-800"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
