const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");

/**
 * ================================
 * 🔹 ADMIN: GET ALL EVENTS
 * GET /api/admin/events
 * ================================
 */
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (err) {
    console.error("ADMIN GET EVENTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

/**
 * ================================
 * 🔹 ADMIN: DELETE EVENT
 * DELETE /api/admin/events/:id
 * ================================
 */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("ADMIN DELETE EVENT ERROR:", err);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

/**
 * ================================
 * 🔹 ADMIN: BOOKINGS GROUPED BY EVENTS
 * GET /api/admin/bookings/events
 * ================================
 */
exports.getBookingsByEvents = async (req, res) => {
  try {
    const events = await Event.find().lean();

    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("event")
      .lean();

    const grouped = events.map((event) => ({
      eventId: event._id,
      title: event.title,
      organizer: event.organizer || event.createdBy || null,
      bookings: bookings.filter(
        (b) =>
          b.event &&
          b.event._id.toString() === event._id.toString() &&
          b.user?.role !== "admin" // 🔥 exclude admin bookings
      ),
    }));

    res.json(grouped);
  } catch (err) {
    console.error("ADMIN BOOKINGS BY EVENTS ERROR:", err);
    res.status(500).json({ message: "Failed to load bookings by events" });
  }
};

/**
 * ================================
 * 🔹 ADMIN: BOOKINGS GROUPED BY USERS
 * GET /api/admin/bookings/users
 * ================================
 */
exports.getBookingsByUsers = async (req, res) => {
  try {
    // 🔥 exclude admin users
    const users = await User.find({
      role: { $ne: "admin" },
    });

    const bookings = await Booking.find()
      .populate("event", "title date location")
      .populate("user", "name email role")
      .lean();

    const grouped = users.map((user) => ({
      userId: user._id,
      name: user.name,
      email: user.email,
      bookings: bookings.filter(
        (b) =>
          b.user &&
          b.user._id.toString() === user._id.toString() &&
          b.user.role !== "admin"
      ),
    }));

    res.json(grouped);
  } catch (err) {
    console.error("ADMIN BOOKINGS BY USERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch bookings by users" });
  }
};

/**
 * ================================
 * 🔹 ADMIN: DELETE ANY BOOKING
 * DELETE /api/admin/bookings/:id
 * ================================
 */
exports.adminDeleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking deleted by admin" });
  } catch (err) {
    console.error("ADMIN DELETE BOOKING ERROR:", err);
    res.status(500).json({ message: "Failed to delete booking" });
  }
};

/**
 * ================================
 * 🔹 ADMIN: GET ALL USERS (EXCEPT ADMIN)
 * GET /api/admin/users
 * ================================
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $ne: "admin" }, // 🔥 exclude admin
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error("ADMIN GET USERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * ================================
 * 🔹 ADMIN: DELETE USER
 * DELETE /api/admin/users/:id
 * ================================
 */
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // 🚫 Prevent deleting self
    if (req.user.id === userId) {
      return res.status(400).json({
        message: "Admin cannot delete own account",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🚫 Prevent deleting last admin
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res.status(400).json({
          message: "Cannot delete the last admin",
        });
      }
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("ADMIN DELETE USER ERROR:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

/**
 * ================================
 * 🔹 ADMIN: ANALYTICS
 * GET /api/admin/stats
 * ================================
 */
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });
    const totalOrganizers = await User.countDocuments({ role: "organizer" });
    const totalEvents = await Event.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const topEvents = await Booking.aggregate([
      { $group: { _id: "$event", bookings: { $sum: 1 } } },
      { $sort: { bookings: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" },
      {
        $project: {
          _id: 0,
          eventId: "$event._id",
          title: "$event.title",
          bookings: 1,
        },
      },
    ]);

    res.json({
      totalUsers,
      totalOrganizers,
      totalEvents,
      totalBookings,
      topEvents,
    });
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ message: "Failed to load analytics" });
  }
};
