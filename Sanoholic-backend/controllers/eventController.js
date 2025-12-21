const Event = require("../models/Event");
const Booking = require("../models/Booking");

// ============================
// CREATE EVENT (Organizer/Admin)
// ============================
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create event" });
  }
};

// ============================
// GET ALL EVENTS (Public)
// ============================
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// ============================
// GET SINGLE EVENT BY ID
// ============================
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching event" });
  }
};

// ============================
// GET EVENT SEAT AVAILABILITY
// ============================
exports.getEventSeats = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    const bookedCount = await Booking.countDocuments({
      event: event._id,
    });

    const seatsLeft = event.capacity - bookedCount;

    res.json({
      capacity: event.capacity,
      booked: bookedCount,
      seatsLeft: seatsLeft < 0 ? 0 : seatsLeft,
      isFull: seatsLeft <= 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch seats" });
  }
};

// ============================
// GET EVENTS CREATED BY ORGANIZER
// ============================
exports.getMyEvents = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const events = await Event.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });
    console.log("REQ USER:", req.user);
    res.json(events);
  } catch (err) {
    console.error("GET MY EVENTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch your events" });
  }
};


// ============================
// DELETE EVENT
// ============================
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    // Organizer can delete only their own events
    if (
      req.user.role === "organizer" &&
      event.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event" });
  }
};

exports.getEventStats = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const booked = await Booking.countDocuments({
      event: event._id,
    });

    res.json({
      capacity: event.capacity,
      booked,
      remaining: event.capacity - booked,
    });
  } catch (err) {
    console.error("EVENT STATS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch event stats" });
  }
};