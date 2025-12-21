const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createBooking,
  getMyBookings,
  getEventBookings,
  cancelBooking,
} = require("../controllers/bookingController");

// ✅ USER ONLY
router.post("/", auth, role(["user"]), createBooking);
router.get("/my", auth, role(["user"]), getMyBookings);
router.delete("/:id", auth, role(["user"]), cancelBooking);

// ✅ ORGANIZER / ADMIN
router.get(
  "/event/:id",
  auth,
  role(["organizer", "admin"]),
  getEventBookings
);

module.exports = router;
