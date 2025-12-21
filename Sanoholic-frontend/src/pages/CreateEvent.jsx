import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: 0,
    capacity: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", form);
      navigate("/organizer");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-slate-950 border border-slate-800
                   p-8 rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-100">
          Create Event
        </h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            type={key === "date" ? "date" : "text"}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-800
                       text-gray-200 px-4 py-2 rounded"
            required
          />
        ))}

        <button className="w-full bg-green-500 text-black py-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
}
