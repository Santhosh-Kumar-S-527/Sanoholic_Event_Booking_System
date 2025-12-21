const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const adminController = require("../controllers/adminController");
const organizerRequestController = require("../controllers/organizerRequestController");

// ==================== EVENTS ====================
router.get(
  "/events",
  auth,
  role("admin"),
  adminController.getAllEvents
);

router.delete(
  "/events/:id",
  auth,
  role("admin"),
  adminController.deleteEvent
);

// ==================== BOOKINGS ====================
router.get(
  "/bookings/events",
  auth,
  role("admin"),
  adminController.getBookingsByEvents
);

router.get(
  "/bookings/users",
  auth,
  role("admin"),
  adminController.getBookingsByUsers
);

router.delete(
  "/bookings/:id",
  auth,
  role("admin"),
  adminController.adminDeleteBooking
);

// ==================== USERS ====================
router.get(
  "/users",
  auth,
  role("admin"),
  adminController.getAllUsers
);

router.delete(
  "/users/:id",
  auth,
  role("admin"),
  adminController.deleteUser
);

// ==================== ANALYTICS ====================
router.get(
  "/stats",
  auth,
  role("admin"),
  adminController.getAdminStats
);

// ==================== ORGANIZER REQUESTS ====================
router.get(
  "/organizer-requests",
  auth,
  role("admin"),
  organizerRequestController.getRequests
);

router.post(
  "/organizer-requests/:id/approve",
  auth,
  role("admin"),
  organizerRequestController.approveRequest
);

router.post(
  "/organizer-requests/:id/reject",
  auth,
  role("admin"),
  organizerRequestController.rejectRequest
);

module.exports = router;
