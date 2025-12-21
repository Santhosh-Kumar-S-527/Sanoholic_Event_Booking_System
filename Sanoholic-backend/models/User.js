const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },

    // 🔐 ROLE-BASED AUTH
    role: {
      type: String,
      enum: ["user", "organizer", "admin"],
      default: "user",
    },
    mustChangePassword: {
      type: Boolean,
      default: false,
    },
    isApproved: {
    type: Boolean,
    default: function () {
      return this.role !== "organizer"; // users & admins auto-approved
    },
  },
    avatar: {
      type: String,
      default: "", // empty = default avatar
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
