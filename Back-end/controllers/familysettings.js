const { validateToken } = require("../services/authentication");
const Family = require("../models/family");
const User = require("../models/users");
const nodeMailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

async function sendRequest(req, res) {
  const { email } = req.body;

  const familyId = req.user.familyId;
  console.log(familyId);
  const name = req.user.userName;
  const senderEmail = req.user.email;

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
        from: `intellihome.official@gmail.com`,
        to: `${email}`,
        subject: `Join ${firstname}'s family group ?`,
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invitation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background-color: #f8f9fa;
                }
        
                .container {
                    text-align: center;
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    width: 100%;
                }
        
                .logo {
                    max-width: 100px;
                    margin-bottom: 20px;
                }
        
                .profile-circle {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #08B765;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
        
                .profile-circle p {
                    color: white;
                    margin: 0;
                }
        
                .profile-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px 0;
                }
        
                .email {
                    margin: 10px 0;
                }
        
                .message {
                    text-align: left;
                    margin: 10px 30px;
                    margin-bottom: 22px;
                }
        
                .btn {
                    background-color: #2b84e3;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                }
        
                .btn:hover {
                    background-color: #0056b3;
                }
        
                hr {
                    border: none;
                    border-top: 1px solid #e0e0e0;
                    margin: 20px 0;
                }
        
                .intelli-logo {
                    height: 2.6rem;
                    width: 15rem;
                    border-radius: 8%;
                    margin-right: 20px;
                    /* cursor: pointer; */
                    /* filter: brightness(110%); */
                }
                .break{
                    height: 1.5px;
                    color: #fff;
                    width: 90%;
                    background-color: rgb(221, 218, 216);
                    float: center;
                    text-align: center;
                    margin-left: 5%;
                    margin-right: 5%;
                    margin-bottom: 25px;
                }
        
                @media (max-width: 600px) {
                    .container {
                        padding: 15px;
                    }
        
                    .btn {
                        padding: 8px 16px;
                        font-size: 14px;
                    }
        
                    .profile-container {
                        gap: 10px;
                    }
        
                    .profile-circle {
                        margin-right: 0;
                        margin-bottom: 10px;
                    }
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <img src="text-logo.png" alt="" class="intelli-logo">
                <p>${name} wants you to join his family group</p>
                <div class="profile-container">
                    <div class="profile-circle">
                        <p style="font-size: 15px;">${logo}</p>
                    </div>
                    <div class="email">${senderEmail}</div>
                </div>
                <div class="break"></div>
                <p class="message">Hi ${email},</p>
                <p class="message">You can join ${firstname}'s (${senderEmail}) family group to connect with your family on
                    IntelliHome and share services among the family members.</p>
                <p class="message">Anyone who joins a family group can see the name, email of current group members.</p><br>
                <button class="btn" ><a href="http://localhost:5173/register-page/?familyId=${familyId}">Accept Invitation</a></button>
            </div>
        </body>
        
        </html>
    `,
        attachments: [
          {
            filename: "text-logo.png",
            path: "text-logo.png", // Path to your image file
            cid: "intelli_logo", // Same CID value as in the HTML img src
          },
        ],
      };

      try {
        // Send email
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email sent successfully" });
      } catch (error) {
        // console.error("Error:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
    }
  } catch (error) {
    // console.error(error);
    return res.status(400).json({ message: "Server error" });
  }
}

async function haveData(req, res) {
  console.log(req.user);
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
}

async function deleteMe(req, res) {
  const { familyId, _id } = req.user;

  try {
    const family = await Family.findById(familyId).exec();
    family.members = family.members.filter(
      (memberId) => memberId.toString() !== _id.toString()
    );
    // Save the updated family document
    await family.save();

    const result1 = await User.updateOne(
      { _id: _id },
      { $set: { role: true } }
    );

    const result = await Family.create({
      members: [_id],
    });
    return res.status(202).json({ message: "Done" });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting User" });
  }
}

module.exports = {
  sendRequest,
  haveData,
  verifyMemebr,
  deleteMe,
};
