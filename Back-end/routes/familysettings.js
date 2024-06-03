const express = require("express");

const {
  sendRequest,
  haveData,
  verifyMemebr,
  deleteMe,
} = require("../controllers/familysettings");

const router = express.Router();

router.route("/send-request").post(sendRequest);

router.route("/get-member-list").get(haveData);

router.route("/members-token-verify").post(verifyMemebr);

router.route("/deleteUser").delete(deleteMe);

module.exports = router;
