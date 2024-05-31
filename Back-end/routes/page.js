const express = require("express");

const {
  createNewUser,
  signInUser,
  logoutUser,
} = require("../controllers/page.js");

const router = express.Router();

router.route("/register").post(createNewUser);

router.route("/signin").post(signInUser);

router.route("/logout").post(logoutUser);

module.exports = router;
