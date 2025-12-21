import { useState } from "react";
import API from "../utils/api";

export default function OrganizerRequest() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/organizer-request", form);
      alert("Organizer request submitted successfully");
      setForm({
        name: "",
        email: "",
        phone: "",
        organization: "",
        reason: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-8 w-full max-w-md text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
          Organizer Request
        </h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-slate-950 border border-slate-700"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-slate-950 border border-slate-700"
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-slate-950 border border-slate-700"
          required
        />

        <input
          name="organization"
          placeholder="Organization"
          value={form.organization}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-slate-950 border border-slate-700"
          required
        />

        <textarea
          name="reason"
          placeholder="Why do you want to organize events?"
          value={form.reason}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-slate-950 border border-slate-700"
          rows="3"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-black py-2 rounded hover:bg-green-400 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
