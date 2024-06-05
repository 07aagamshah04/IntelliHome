const express = require("express");

const {
  GetAllUsers,
  GetuserById,
  UpdateuserByid,
  DeleteuserByid,
  sendEmail,
  verifyEmail,
  addFiles,
  getAadhar,
  getPan,
  getVoterId,
  getMarkSheet,
  getLicense,
  verifyMemeber,
  deleteAadhar,
  deleteLicense,
  deleteMarksheet,
  deleteVoterId,
  deletePan,
} = require("../controllers/users");

const router = express.Router();

router.route("/").get(GetAllUsers);

router.route("/send-email").post(sendEmail);

router.route("/verify-email").post(verifyEmail);

router.route("/intellivault").post(addFiles);

router.route("/aadhar").get(getAadhar);
router.route("/aadhar/:id").delete(deleteAadhar);

router.route("/pan").get(getPan);
router.route("/pan/:id").delete(deletePan);

router.route("/voterid").get(getVoterId);
router.route("/voterid/:id").delete(deleteVoterId);

router.route("/marksheet").get(getMarkSheet);
router.route("/marksheet/:id").delete(deleteMarksheet);

router.route("/license").get(getLicense);
router.route("/license/:id").delete(deleteLicense);

router.route("/members-token-verify").post(verifyMemeber);

router
  .route("/:id")
  .get(GetuserById)
  .patch(UpdateuserByid)
  .delete(DeleteuserByid);

module.exports = router;
