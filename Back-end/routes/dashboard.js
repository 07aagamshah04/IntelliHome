const express = require("express");
const {
  getEvents,
  verifyMemebr,
  addEvent,
  removeEvent,
} = require("../controllers/dashboard");

const router = express.Router();

router.route("/get-events").get(getEvents);
router.route("/members-token-verify").post(verifyMemebr);
router.route("/add-event").post(addEvent);
router.route("/remove-event/:id").delete(removeEvent);
module.exports = router;
