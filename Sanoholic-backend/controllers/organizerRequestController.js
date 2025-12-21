const OrganizerRequest = require("../models/OrganizerRequest");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// ================================
// CREATE ORGANIZER REQUEST
// ================================
exports.createRequest = async (req, res) => {
  try {
    const exists = await OrganizerRequest.findOne({
      email: req.body.email,
    });

    if (exists) {
      return res.status(400).json({
        message: "Organizer request already submitted",
      });
    }

    const request = await OrganizerRequest.create(req.body);
    res.status(201).json({ message: "Request submitted", request });
  } catch (err) {
    console.error("CREATE REQUEST ERROR:", err);
    res.status(500).json({ message: "Failed to submit request" });
  }
};

// ================================
// GET ALL REQUESTS (ADMIN)
// ================================
exports.getRequests = async (req, res) => {
  try {
    const requests = await OrganizerRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error("GET REQUESTS ERROR:", err);
    res.status(500).json({ message: "Failed to load requests" });
  }
};

// ================================
// APPROVE ORGANIZER REQUEST ✅
// ================================
exports.approveRequest = async (req, res) => {
  try {
    const request = await OrganizerRequest.findById(req.params.id);
    if (!request)
      return res.status(404).json({ message: "Request not found" });

    if (request.status !== "pending")
      return res.status(400).json({ message: "Request already processed" });

    // 🔐 TEMP PASSWORD
    const tempPassword = "Organizer@123";
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // ✅ CREATE ORGANIZER ACCOUNT
    await User.create({
      name: request.name,
      email: request.email,
      phone: request.phone,
      password: hashedPassword,
      role: "organizer",
      isApproved: true,          // 🔥 REQUIRED
      mustChangePassword: true,
    });

    // ✅ UPDATE REQUEST STATUS
    request.status = "approved";
    await request.save();

    // 📧 EMAIL SHOULD NEVER BREAK FLOW
    try {
      await sendEmail(
        request.email,
        "Organizer Approved - SANOHOLIC",
        `Your organizer account has been approved.

Login using:
Email: ${request.email}
Password: ${tempPassword}

Please change your password after login.`
      );
    } catch (emailErr) {
      console.error("EMAIL FAILED (IGNORED):", emailErr.message);
    }

    // ✅ ALWAYS RETURN SUCCESS
    res.json({ message: "Organizer approved successfully" });

  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ message: "Approval failed" });
  }
};

// ================================
// REJECT ORGANIZER REQUEST ❌
// ================================
exports.rejectRequest = async (req, res) => {
  try {
    const request = await OrganizerRequest.findById(req.params.id);
    if (!request)
      return res.status(404).json({ message: "Request not found" });

    request.status = "rejected";
    await request.save();

    await sendEmail(
      request.email,
      "Organizer Request Rejected - SANOHOLIC",
      "Sorry, your organizer request has been rejected."
    );

    res.json({ message: "Request rejected successfully" });
  } catch (err) {
    console.error("REJECT ERROR:", err);
    res.status(500).json({ message: "Rejection failed" });
  }
};
