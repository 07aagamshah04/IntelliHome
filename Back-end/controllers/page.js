const User = require("../models/users");
async function createNewUser(req, res) {
  const body = req.body;

  if (
    !body ||
    !body.userName ||
    !body.email ||
    !body.gender ||
    !body.dob ||
    !body.password ||
    !body.role
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  // console.log(body);
  const result = await User.create({
    userName: body.userName,
    email: body.email,
    gender: body.gender,
    dob: body.dob,
    password: body.password,
    role: body.role,
  });

  return res.status(201).json({ msg: "succedd", id: result._id });
}

async function signInUser(req, res) {
  const body = req.body;
  if (!body || !body.email || !body.password) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  // const user = await User.findOne({ email: body.email });

  // if (!user) {
  //   return res.status(400).json({ msg: "User not found" });
  // }
  // if (user.password !== body.password) {
  //   return res.status(400).json({ msg: "Password is incorrect" });
  // }
  // return res.status(201).json({ msg: "succedd" });
  try {
    const token = await User.matchPasswordAndGenerateToken(
      body.email,
      body.password
    );

    // console.log(token);

    return res.cookie("token", token).status(201).json({ msg: "succed" });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Password is incorrect or email is incorrect" });
  }
}

module.exports = {
  createNewUser,
  signInUser,
};
