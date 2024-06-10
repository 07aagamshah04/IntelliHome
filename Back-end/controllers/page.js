const User = require("../models/users");
const Family = require("../models/family");

async function createNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.userName ||
    !body.email ||
    !body.gender ||
    !body.dob ||
    !body.password
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const result1 = await User.create({
      userName: body.userName,
      email: body.email,
      gender: body.gender,
      dob: body.dob,
      password: body.password,
      role: Object.keys(req.query).length === 0 ? body.role : false,
    });

    if (req.body.familyId === "nathi bhai") {
      try {
        const result = await Family.create({
          members: [result1._id],
        });
      } catch (error) {
        return res.status(400).json({ msg: "Failed to add in Family" });
      }
    } else {
      try {
        const result = await Family.findOne({ _id: req.body.familyId });
        result.members.push(result1._id);
        await result.save();
      } catch (error) {
        return res.status(400).json({ msg: "Failed to add in Family" });
      }
    }

    return res.status(201).json({ msg: "User created", id: result1._id });
  } catch (error) {
    return res.status(409).json({ msg: "Email-id already exists" });
  }
}

async function signInUser(req, res) {
  const body = req.body;

  if (!body || !body.email || !body.password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (body.familyId === "nathi bhai") {
    try {
      const token = await User.matchPasswordAndGenerateToken(
        body.email,
        body.password
      );

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true, // Ensure this is true if your site is served over HTTPS
          sameSite: "None", // Required for cross-site requests
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          path: "/",
        })
        .status(201)
        .json({ cookie: token, msg: "succeed" });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Password is incorrect or email is incorrect" });
    }
  } else {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) throw new Error("User not found!");

      const family = await Family.findOne({ members: user._id });
      if (!family) throw new Error("User's family not found!");

      const userFamilyId = family._id;
      const newFamilyId = body.familyId;

      if (user.role === true && family.members.length > 1) {
        return res.status(400).json({
          message:
            "You can't directly invite Family manager of another family....To invite him/her they have to delete their entire group first",
        });
      } else if (user.role === false) {
        // Remove user from their current family
        await Family.updateOne(
          { _id: userFamilyId },
          { $pull: { members: user._id } }
        );

        // Add user to the new family
        await Family.updateOne(
          { _id: newFamilyId },
          { $addToSet: { members: user._id } }
        );
      } else {
        // User is a manager and the only member of the family, delete the family
        await Family.deleteOne({ _id: userFamilyId });

        // Change user's role to false and save
        const updatedUser = await User.findOneAndUpdate(
          { email: body.email },
          { role: false },
          { new: true }
        );
        // Add user to the new family
        await Family.updateOne(
          { _id: newFamilyId },
          { $addToSet: { members: user._id } }
        );
      }
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "An error occurred while processing the request." });
    }

    try {
      const token = await User.matchPasswordAndGenerateToken(
        body.email,
        body.password
      );

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true, // Ensure this is true if your site is served over HTTPS
          sameSite: "None", // Required for cross-site requests
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          path: "/",
        })
        .status(201)
        .json({ cookie: token, msg: "succeed" });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Password is incorrect or email is incorrect" });
    }
  }
}

async function logoutUser(req, res) {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: true, // Ensure this is true if your site is served over HTTPS
      sameSite: "None", // Required for cross-site requests
      path: "/", // The same path attribute used when setting the cookie
    })
    .status(201)
    .json({ msg: "Token deleted" });
}

module.exports = {
  createNewUser,
  signInUser,
  logoutUser,
};
