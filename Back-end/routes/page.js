const express = require("express");

const { createNewUser, signInUser } = require("../controllers/page.js");

const router = express.Router();

router.route("/register").post(createNewUser);

router.route("/signin").post(signInUser);

module.exports = router;
