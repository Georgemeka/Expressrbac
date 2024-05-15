const express = require("express");

const {
  register,
  login,
  getUserProfile,
} = require("../controllers/userController");

const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
  "/profile",
  authenticate,
  authorize(["admin, users"]),
  getUserProfile
);

module.exports = router;
