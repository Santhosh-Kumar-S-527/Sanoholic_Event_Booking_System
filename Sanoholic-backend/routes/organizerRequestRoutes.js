const router = require("express").Router();
const {
  createRequest,
} = require("../controllers/organizerRequestController");

router.post("/", createRequest);

module.exports = router;
