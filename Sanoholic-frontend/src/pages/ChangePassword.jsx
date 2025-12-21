import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      alert("Password changed successfully. Please login again.");

      // 🔓 Force re-login
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-950 border border-slate-800 p-8 rounded-xl w-[360px]"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="Old Password"
          className="w-full mb-4 px-4 py-2 rounded bg-slate-900 border border-slate-700 text-gray-200"
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-4 px-4 py-2 rounded bg-slate-900 border border-slate-700 text-gray-200"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full mb-6 px-4 py-2 rounded bg-slate-900 border border-slate-700 text-gray-200"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
}
