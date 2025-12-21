const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Event = require("../models/Event");

/**
 * 🔹 CREATE BOOKING
 * POST /api/bookings
 */
exports.createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;

    // 🚫 BLOCK ORGANIZER & ADMIN
    if (req.user.role !== "user") {
      return res.status(403).json({
        message: "Only users can book events",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const alreadyBooked = await Booking.findOne({
      user: req.user.id,
      event: eventId,
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: "Already booked this event" });
    }

    const bookedCount = await Booking.countDocuments({ event: eventId });
    if (bookedCount >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    const booking = await Booking.create({
      user: new mongoose.Types.ObjectId(req.user.id),
      event: new mongoose.Types.ObjectId(eventId),
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err);
    res.status(500).json({
      message: "Failed to create booking",
      error: err.message,
    });
  }
};

/**
 * 🔹 GET MY BOOKINGS (USER ONLY)
 * GET /api/bookings/my
 */
exports.getMyBookings = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        message: "Only users have bookings",
      });
    }

    const bookings = await Booking.find({
      user: req.user.id,
    }).populate("event");

    res.json(bookings);
  } catch (err) {
    console.error("GET MY BOOKINGS ERROR:", err);
    res.status(500).json({
      message: "Failed to load bookings",
      error: err.message,
    });
  }
};

/**
 * 🔹 EVENT BOOKINGS (ORGANIZER / ADMIN)
 * GET /api/bookings/event/:id
 */
exports.getEventBookings = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const bookings = await Booking.find({
      event: eventId,
    }).populate("user", "name email phone");

    res.json(bookings);
  } catch (err) {
    console.error("GET EVENT BOOKINGS ERROR:", err);
    res.status(500).json({
      message: "Failed to load event bookings",
      error: err.message,
    });
  }
};

/**
 * 🔹 CANCEL BOOKING (USER ONLY)
 * DELETE /api/bookings/:id
 */
exports.cancelBooking = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        message: "Only users can cancel bookings",
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("CANCEL BOOKING ERROR:", err);
    res.status(500).json({
      message: "Failed to cancel booking",
      error: err.message,
    });
  }
};
