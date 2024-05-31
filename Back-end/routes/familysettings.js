const express = require("express");

const {
  sendRequest
} = require("../controllers/familysettings");

const router = express.Router();

router.route('/send-request').post(sendRequest);

module.exports = router;
