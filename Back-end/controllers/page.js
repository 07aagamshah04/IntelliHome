const User = require("../models/users");
const Family = require("../models/family");
async function createNewUser(req, res) {
  const body = req.body;
  // console.log(req.query);
  // console.log(Object.keys(req.query).length === 0);
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

  // if (Object.keys(req.query).length === 0) {

  // }
  // console.log(body);
  try {
    const result1 = await User.create({
      userName: body.userName,
      email: body.email,
      gender: body.gender,
      dob: body.dob,
      password: body.password,
      role: Object.keys(req.query).length === 0 ? body.role : false,
    });

    if (Object.keys(req.query).length === 0) {
      try {
        const result = await Family.create({
          members: [result1._id],
        });
      } catch (error) {
        return res.status(400).json({ msg: "  Failed to add entry in Family" });
      }
    } else {
      console.log(req.qurey);
    }

    return res.status(201).json({ msg: "succedd", id: result1._id });
  } catch (error) {
    return res.status(409).json({ msg: "Email-id already exists" });
  }
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
    // res.cookie("uid", token, {
    //   domain: "www.shorturl.com",
    // });
    return res.cookie("token", token).status(201).json({ msg: "succed" });
  } catch (error) {
    // console.log(error);
    return res
      .status(400)
      .json({ msg: "Password is incorrect or email is incorrect" });
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  return res.status(201).json({ msg: "Token deleted" });
}

module.exports = {
  createNewUser,
  signInUser,
  logoutUser,
};
