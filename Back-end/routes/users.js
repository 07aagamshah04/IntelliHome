const express = require("express");

const {
  GetAllUsers,
  GetuserById,
  UpdateuserByid,
  DeleteuserByid,
  sendEmail,
  verifyEmail,
  // putPost,
  // getPost,
} = require("../controllers/users");

const router = express.Router();

router.route("/").get(GetAllUsers);

router.route("/send-email").post(sendEmail);

router.route("/verify-email").post(verifyEmail);

// router.route("/posts").post(putPost).get(getPost);

router
  .route("/:id")
  .get(GetuserById)
  .patch(UpdateuserByid)
  .delete(DeleteuserByid);

module.exports = router;
