const express = require("express");
const auth = require("../middleware/authMiddleware");
const upload = require("../utils/uploadAvatar")
const userController = require("../controllers/userController");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");


const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", auth, role(["admin"]), getAllUsers);
router.put("/:id/role", auth, role(["admin"]), updateUserRole);
router.delete("/:id", auth, role(["admin"]), deleteUser);
router.post(
  "/avatar",
  auth,
  upload.single("avatar"),
  userController.uploadAvatar
);
module.exports = router;
