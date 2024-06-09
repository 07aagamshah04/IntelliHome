const { validateToken } = require("../services/authentication");
const Family = require("../models/family");
const User = require("../models/users");
const path = require("path");

const Files = require("../models/blogs");
const Aadhar = require("../models/aadhar");
const Events = require("../models/events");
const License = require("../models/license");
const Marksheet = require("../models/marksheet");
const Pan = require("../models/pan");
const VoterId = require("../models/voterid");
const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const transporter = nodeMailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  })
);

async function sendRequest(req, res) {
  const { email } = req.body;

  console.log(email);

  const familyId = req.user.familyId;
  const name = req.user.userName;
  const senderEmail = req.user.email;

  console.log(familyId, name, senderEmail, EMAIL, PASSWORD);

  try {
    // Find the family by ID
    const family = await Family.findById(familyId);

    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }

    // Extract the member IDs from the family
    const memberIds = family.members;

    // Find if any user within those member IDs has the specified email
    const userWithEmail = await User.findOne({
      _id: { $in: memberIds },
      email: email,
    });

    if (userWithEmail) {
      return res.status(400).json({
        message: "Email exists within the family",
      });
    } else {
      let fullname = name.split(" ");
      let firstname = fullname[0];
      let lastname = fullname[1] || "";
      let logo = firstname[0] + lastname[0];
      const mailOptions = {
        from: `${EMAIL}`,
        to: email,
        subject: `Join ${firstname}'s family group?`,
        text: "hello",
      };

      // from: `${EMAIL}`,
      //   to: email,
      //   subject: `Join ${firstname}'s family group?`,
      //   html: `<!DOCTYPE html>
      //   <html lang="en">
      //     <head>
      //       <meta charset="UTF-8">
      //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
      //       <title>Invitation</title>
      //       <style>
      //         body {
      //           font-family: Arial, sans-serif;
      //           margin: 0;
      //           padding: 0;
      //           box-sizing: border-box;
      //           background-color: #f8f9fa;
      //           width: 100%;
      //         }
      //         .container {
      //           text-align: center;
      //           background: #fff;
      //           padding: 20px;
      //           border-radius: 10px;
      //           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      //           max-width: 500px;
      //           width: 100%;
      //           margin: 20px auto;
      //         }
      //         .intelli-logo {
      //           height: 2.6rem;
      //           width: 15rem;
      //           border-radius: 8%;
      //           margin-bottom: 20px;
      //         }
      //         .profile-circle {
      //           background-color: #08B765;
      //           width: 32px;
      //           height: 32px;
      //           border-radius: 50%;
      //           display: inline-block;
      //           vertical-align: middle;
      //         }
      //         .profile-circle p {
      //           color: white;
      //           margin: 0;
      //           font-size: 15px;
      //           line-height: 32px;
      //           text-align: center;
      //         }
      //         .email {
      //           display: inline-block;
      //           vertical-align: middle;
      //           margin-left: 10px;
      //         }
      //         .message {
      //           text-align: left;
      //           margin: 10px 30px;
      //           margin-bottom: 22px;
      //         }
      //         .btn {
      //           background-color: white;
      //           color: white;
      //           border: 1px solid gray;
      //           padding: 10px 20px;
      //           border-radius: 5px;
      //           cursor: pointer;
      //           text-align: center;
      //           text-decoration: none;
      //           display: inline-block;
      //           font-size: 16px;
      //         }
      //         .btn a {
      //           color: white;
      //           text-decoration: none;
      //         }
      //         .btn:hover {
      //           border: 1px solid blue;
      //         }
      //         hr {
      //           border: none;
      //           border-top: 1px solid #e0e0e0;
      //           margin: 20px 0;
      //         }
      //         .break {
      //           height: 1.5px;
      //           color: #fff;
      //           width: 90%;
      //           background-color: rgb(221, 218, 216);
      //           margin: 25px auto;
      //         }
      //         @media (max-width: 600px) {
      //           .container {
      //             padding: 15px;
      //           }
      //           .btn {
      //             padding: 8px 16px;
      //             font-size: 14px;
      //           }
      //         }
      //       </style>
      //     </head>
      //     <body>
      //       <div class="container">
      //         <img src="cid:intelli_logo" alt="IntelliHome Logo" class="intelli-logo">
      //         <p>${name} wants you to join his family group</p>
      //         <table align="center" cellspacing="0" cellpadding="0">
      //           <tr>
      //             <td>
      //               <div class="profile-circle">
      //                 <p>${logo}</p>
      //               </div>
      //             </td>
      //             <td class="email">${senderEmail}</td>
      //           </tr>
      //         </table>
      //         <div class="break"></div>
      //         <p class="message">Hi ${email},</p>
      //         <p class="message">You can join ${firstname}'s (${senderEmail}) family group to connect with your family on IntelliHome and share services among the family members.</p>
      //         <p class="message">Anyone who joins a family group can see the name, email of current group members.</p>
      //         <br>
      //         <a href="http://localhost:5173/register-page/?familyId=${familyId}" class="btn">Accept Invitation</a>
      //       </div>
      //     </body>
      //   </html>
      //   `,
      //   attachments: [
      //     {
      //       filename: "text-logo.png",
      //       path: "../text-logo.png", // Update with the correct path to your image file
      //       cid: "intelli_logo", // Same CID value as in the HTML img src
      //     },
      //   ],

      try {
        // Send email
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email sent successfully" });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
    }
  } catch (error) {
    // console.error(error);
    return res.status(400).json({ message: "Server error" });
  }
}

async function haveData(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "UnAuthorized" });
  }
  const { familyId } = req.user;
  const family = await Family.findById(familyId).exec();
  const memberIds = family.members;
  const members = await User.find({ _id: { $in: memberIds } })
    .select("userName email role")
    .exec();
  // console.log(members);
  return res.status(200).json({
    data: members,
    email: req.user.email,
    role: req.user.role ? "Family Manager" : "Member",
  });
}

async function verifyMemebr(req, res) {
  return res.status(200).json({ msg: "Done" });
}

async function deleteGroup(req, res) {
  const { familyId } = req.user;
  try {
    // Delete related records
    await Promise.all([
      Aadhar.deleteMany({ createdBy: familyId }),
      Files.deleteMany({ createdBy: familyId }),
      Events.deleteMany({ createdBy: familyId }),
      License.deleteMany({ createdBy: familyId }),
      Marksheet.deleteMany({ createdBy: familyId }),
      Pan.deleteMany({ createdBy: familyId }),
      VoterId.deleteMany({ createdBy: familyId }),
    ]);

    // Fetch the members of the family
    const family = await Family.findById(familyId).populate("members");
    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }
    const members = family.members;

    // Create new family entries and assign members to these families
    const newFamilies = await Promise.all(
      members.map(async (member) => {
        const newFamily = new Family({
          members: [member._id],
        });
        await newFamily.save();

        // Update user with new familyId and role
        await User.findByIdAndUpdate(member._id, {
          familyId: newFamily._id,
          role: true,
        });
        return newFamily;
      })
    );

    // Delete the original family entry
    await Family.findByIdAndDelete(familyId);

    res
      .status(200)
      .json({ message: "Group deleted and members reassigned successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting group and reassigning members", error });
  }
}

async function deleteMe(req, res) {
  const { familyId } = req.user;
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the family by familyId
    const family = await Family.findById(familyId).exec();

    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }

    // Remove the user from the family members
    family.members = family.members.filter(
      (memberId) => memberId.toString() !== user._id.toString()
    );

    // Save the updated family document
    await family.save();

    // Update the user's role to true
    await User.updateOne({ _id: user._id }, { $set: { role: true } });

    // Create a new family with the user as the only member
    await Family.create({
      members: [user._id],
    });

    return res.status(202).json({
      message: "User has been successfully updated and moved to a new family",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error deleting User" });
  }
}

module.exports = {
  sendRequest,
  haveData,
  verifyMemebr,
  deleteMe,
  deleteGroup,
};
