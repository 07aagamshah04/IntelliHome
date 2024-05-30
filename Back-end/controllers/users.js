const User = require("../models/users");
const nodeMailer = require("nodemailer");
const Files = require("../models/files");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "intellihome.official@gmail.com",
    pass: "sqwu mngn ypnz tyqf",
  },
});

async function GetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function GetuserById(req, res) {
  const user = await User.findById(req.params.id);
  if (user === null) {
    return res
      .status(404)
      .json({ msg: `User with ${req.params.id} does not exist` });
  } else {
    return res.json(user);
  }
}

async function UpdateuserByid(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "knfnrfnr" });
  return res.json({ status: "Done" });
}

async function DeleteuserByid(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "deleted" });
}

async function sendEmail(req, res) {
  const mailOptions = {
    from: `intellihome.official@gmail.com`,
    to: `${req.body.email}`,
    subject: "OTP to Connect with us",
    text: `Hello ${req.body.name} ${req.body.otp}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent and data saved successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error sending email");
  }
}

async function putPost(req, res) {
  const body = req.body;

  if (!body || !body.file || !body.title || !body.text) {
    return res.status(400).json({ msg: "All fields are requireedee" });
  }
  // console.log(body);
  const result = await Files.create({
    file: body.file,
    title: body.title,
    text: body.text,
  });
  return res.status(200).json({ msg: "Post added succesfully" });
}

async function getPost(req, res) {
  try {
    const posts = await Files.findById("665192a5032c310fb74878e8");
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch posts", error });
  }
}

module.exports = {
  GetAllUsers,
  GetuserById,
  UpdateuserByid,
  DeleteuserByid,
  sendEmail,
  putPost,
  getPost,
};
