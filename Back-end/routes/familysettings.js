const express = require("express");

const {
  sendRequest,
  haveData,
  verifyMemebr,
  deleteMe,
  deleteGroup,
} = require("../controllers/familysettings");

const router = express.Router();

router.route("/send-request").post(sendRequest);

router.route("/get-member-list").get(haveData);

router.route("/members-token-verify").post(verifyMemebr);

router.route("/deleteUser").post(deleteMe);

router.route("/deleteGroup").delete(deleteGroup);

module.exports = router;
