const User = require("../models/users");
const Family = require("../models/family");
async function createNewUser(req, res) {
  const body = req.body;
  // console.log(req.query);
  // console.log(Object.keys(req.query).length);
  if (
    !body ||
    !body.userName ||
    !body.email ||
    !body.gender ||
    !body.dob ||
    !body.password
  ) {
    console.log(body);
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

    if (req.body.familyId === "nathi bhai") {
      try {
        const result = await Family.create({
          members: [result1._id],
        });
      } catch (error) {
        return res.status(400).json({ msg: "  Failed to add entry in Family" });
      }
    } else {
      try {
        console.log(req.body.familyId);
        const result = await Family.findOne({ _id: req.body.familyId });
        // console.log(result);
        result.members.push(result1._id);
        await result.save();
      } catch (error) {
        return res.status(400).json({ msg: "  Failed to add entry in Family" });
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
    console.log("aayo");
    try {
      const token = await User.matchPasswordAndGenerateToken(
        body.email,
        body.password
      );

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(201)
        .json({ msg: "succeed" });
    } catch (error) {
      console.error("Error generating token:", error);
      return res
        .status(400)
        .json({ msg: "Password is incorrect or email is incorrect" });
    }
  } else {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) throw new Error("User not found!");
      // console.log(user);
      const family = await Family.findOne({ members: user._id });
      if (!family) throw new Error("User's family not found!");
      // console.log(family);

      const userFamilyId = family._id;
      const newFamilyId = body.familyId; // Corrected typo from 'FamilyId' to 'familyId'

      if (user.role === true && family.members.length > 1) {
        return res.status(400).json({
          message:
            "You can't directly invite Family manager of another family....To invite him/her they have to delete entire group first",
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

        // return res
        //   .status(200)
        //   .json({ message: "User successfully moved to the new family." });
      } else {
        // User is a manager and the only member of the family, delete the family
        // console.log("Deleting old family:", userFamilyId);
        await Family.deleteOne({ _id: userFamilyId });

        // console.log("Changing user's role to false");
        // Change user's role to false and save
        const updatedUser = await User.findOneAndUpdate(
          { email: body.email },
          { role: false },
          { new: true }
        );
        // console.log("Adding user to new family:", newFamilyId);
        // Add user to the new family
        await Family.updateOne(
          { _id: newFamilyId },
          { $addToSet: { members: user._id } }
        );
        // return res.status(200).json({
        //   message:
        //     "User successfully moved to the new family and their previous family has been deleted.",
        // });
      }
    } catch (error) {
      console.error("Error processing family change:", error);
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
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(201)
        .json({ msg: "succeed" });
    } catch (error) {
      console.error("Error generating token:", error);
      return res
        .status(400)
        .json({ msg: "Password is incorrect or email is incorrect" });
    }
  }
}

// async function signInUser(req, res) {
//   const body = req.body;
//   if (!body || !body.email || !body.password) {
//     return res.status(400).json({ msg: "All fields are required" });
//   }
//   // const user = await User.findOne({ email: body.email });

//   // if (!user) {
//   //   return res.status(400).json({ msg: "User not found" });
//   // }
//   // if (user.password !== body.password) {
//   //   return res.status(400).json({ msg: "Password is incorrect" });
//   // }
//   // return res.status(201).json({ msg: "succedd" });
//   try {
//     const token = await User.matchPasswordAndGenerateToken(
//       body.email,
//       body.password
//     );

//     // console.log(token);
//     // res.cookie("uid", token, {
//     //   domain: "www.shorturl.com",
//     // });
//     return res.cookie("token", token).status(201).json({ msg: "succed" });
//   } catch (error) {
//     // console.log(error);
//     return res
//       .status(400)
//       .json({ msg: "Password is incorrect or email is incorrect" });
//   }
// }

async function logoutUser(req, res) {
  res.clearCookie("token");
  return res.status(201).json({ msg: "Token deleted" });
}

module.exports = {
  createNewUser,
  signInUser,
  logoutUser,
};
