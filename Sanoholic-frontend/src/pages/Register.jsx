import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../utils/api";

export default function Register() {
  const [params] = useSearchParams();
  const role = params.get("role"); // organizer | null
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    organization: "",
    reason: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role === "organizer") {
        // 🔵 ORGANIZER REQUEST
        await API.post("/organizer-requests", {
          name: form.name,
          email: form.email,
          phone: form.phone,
          organization: form.organization,
          reason: form.reason,
        });

        alert("Organizer request sent. Await admin approval.");
        navigate("/login?role=organizer");
      } else {
        // 🟢 NORMAL USER REGISTRATION
        await API.post("/auth/register", {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });

        alert("Registration successful. Please login.");
        navigate("/login?role=user");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-950 border border-slate-800 rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
          {role === "organizer" ? "Organizer Request" : "User Registration"}
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 rounded bg-slate-900 text-gray-200 border border-slate-700"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 rounded bg-slate-900 text-gray-200 border border-slate-700"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 rounded bg-slate-900 text-gray-200 border border-slate-700"
        />

        {role !== "organizer" && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 rounded bg-slate-900 text-gray-200 border border-slate-700"
          />
        )}

        {role === "organizer" && (
          <>
            <input
              name="organization"
              placeholder="Organization"
              onChange={handleChange}
              required
              className="w-full mb-3 p-2 rounded bg-slate-900 text-gray-200 border border-slate-700"
            />
            <textarea
              name="reason"
              placeholder="Why do you want to organize events?"
              onChange={handleChange}
              required
              className="w-full mb-4 p-2 rounded bg-slate-900 text-gray-200 border border-slate-700"
            />
          </>
        )}

        <button className="w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded font-semibold">
          {role === "organizer" ? "Send Request" : "Register"}
        </button>
      </form>
    </div>
  );
}
