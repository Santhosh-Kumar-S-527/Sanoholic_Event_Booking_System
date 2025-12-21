const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
  getMyEvents,
  deleteEvent,
  getEventStats,   // ✅ IMPORT THIS
} = require("../controllers/eventController");

// 🔹 PUBLIC
router.get("/", getEvents);

// 🔹 ORGANIZER / ADMIN (⚠️ MUST BE BEFORE :id)
router.get(
  "/my",
  auth,
  role(["organizer", "admin"]),
  getMyEvents
);

// 🔹 EVENT STATS (⚠️ MUST BE BEFORE :id)
router.get(
  "/:id/stats",
  auth,
  role(["organizer", "admin", "user"]),
  getEventStats
);

// 🔹 EVENT DETAILS
router.get("/:id", getEventById);

// 🔹 CREATE EVENT
router.post(
  "/",
  auth,
  role(["organizer", "admin"]),
  createEvent
);

// 🔹 DELETE EVENT
router.delete(
  "/:id",
  auth,
  role(["organizer", "admin"]),
  deleteEvent
);

module.exports = router;
