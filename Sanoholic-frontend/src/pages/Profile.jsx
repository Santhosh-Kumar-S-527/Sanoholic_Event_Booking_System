import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import API from "../utils/api";

export default function Profile() {
  const [preview, setPreview] = useState(null);

  const { user, updateUser } = useContext(AuthContext);

const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const res = await API.post("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    updateUser({ avatar: res.data.avatar }); // 🔥 instant update
  } catch {
    alert("Avatar upload failed");
  }
};


  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">My Profile</h1>

        {/* AVATAR */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={
              preview ||
              user.avatar ||
              "https://ui-avatars.com/api/?name=" + user.name
            }
            className="w-20 h-20 rounded-full object-cover border border-slate-700"
          />

          <label className="cursor-pointer text-sm text-green-400">
            Change Avatar
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                setPreview(URL.createObjectURL(e.target.files[0]));
                handleUpload(e);
              }}
            />
          </label>
        </div>

        <p className="text-gray-300">
          <span className="text-gray-400">Name:</span> {user.name}
        </p>
        <p className="text-gray-300">
          <span className="text-gray-400">Role:</span> {user.role}
        </p>
      </div>
    </div>
  );
}
