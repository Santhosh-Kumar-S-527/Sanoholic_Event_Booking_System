import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.png"; // 👈 IMPORT LOGO

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

        {/* LOGO + NAME */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Sanoholic Logo"
            className="w-9 h-9 object-contain"
          />
          <span className="text-xl font-bold text-gray-100 tracking-wide">
            SANOHOLIC
          </span>
        </Link>

        {/* LOGGED-IN LINKS */}
        {token && user && (
          <div className="flex items-center gap-6 text-sm">
            <Link to="/home" className="text-gray-300 hover:text-green-400">
              Home
            </Link>

            <Link to="/events" className="text-gray-300 hover:text-green-400">
              Events
            </Link>

            {(user.role === "organizer" || user.role === "admin") && (
              <Link to="/organizer" className="text-gray-300 hover:text-green-400">
                Dashboard
              </Link>
            )}

            {user.role === "admin" && (
              <Link to="/admin" className="text-green-400 font-semibold">
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
