const User = require("../models/users");
const Aadhar = require("../models/aadhar");
const License = require("../models/license");
const Marksheet = require("../models/marksheet");
const Pan = require("../models/pan");
const VoterId = require("../models/voterid");
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
  if (!req.body.name) {
    return res.status(400).send("Name is required");
  }

  let fullname = req.body.name.split(" ");
  let firstname = fullname[0];
  let lastname = fullname[1] || "";
  let logo = firstname[0] + lastname[0];
  const mailOptions = {
    from: `intellihome.official@gmail.com`,
    to: `${req.body.email}`,
    subject: "OTP to Connect with us",
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Notification</title>
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
    
            .profile-container-logo{
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
    
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #08B765;
                margin: 20px 0;
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
            }
    
            .break {
                height: 1.5px;
                color: #fff;
                width: 90%;
                background-color: rgb(221, 218, 216);
                margin-left: 5%;
                margin-right: 5%;
                margin-bottom: 25px;
            }
    
            @media (max-width: 576px) {
                .container {
                    padding: 15px;
                }
    
                .btn {
                    padding: 8px 16px;
                    font-size: 14px;
                }
    
                .profile-container-logo {
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
            <img src="cid:intelli_logo" alt="Logo" class="intelli-logo">
            <p>One-Time Password (OTP) for Verification</p>
            <div class="break"></div>
            <p class="message">Hi ${req.body.name},</p>
            <p class="message">Your one-time password (OTP) for verification is:</p>
            <div class="otp">${req.body.otp}</div>
            <p class="message">Please enter this OTP to verify your email address. If you did not request this, please ignore this message.</p>
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
    res.status(200).send("Email sent successfully");
  } catch (error) {
    // console.error("Error:", error);
    res.status(500).send("Error sending email");
  }
}

async function verifyEmail(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({ msg: "User with this mail-id already exist.!!" });
    } else {
      res.status(201).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
}

async function addFiles(req, res) {
  const folderName = req.body.folderName;
  const files = req.body.files;
  if (folderName === "AADHAR CARD") {
    try {
      for (const item of files) {
        await Aadhar.create({
          file: item.file,
          filename: item.filename,
          type: item.type,
          size: item.size,
          createdBy: req.user.familyId,
        });
      }
      return res.status(200).json({ message: "Data Added" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "Error" });
    }
  } else if (folderName === "PAN CARD") {
    try {
      for (const item of files) {
        await Pan.create({
          file: item.file,
          filename: item.filename,
          type: item.type,
          size: item.size,
          createdBy: req.user.familyId,
        });
      }
      return res.status(200).json({ message: "Data Added" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "Error" });
    }
  } else if (folderName === "LICENSE") {
    try {
      for (const item of files) {
        await License.create({
          file: item.file,
          filename: item.filename,
          type: item.type,
          size: item.size,
          createdBy: req.user.familyId,
        });
      }
      return res.status(200).json({ message: "Data Added" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "Error" });
    }
  } else if (folderName === "VOTER ID") {
    try {
      for (const item of files) {
        await VoterId.create({
          file: item.file,
          filename: item.filename,
          type: item.type,
          size: item.size,
          createdBy: req.user.familyId,
        });
      }
      return res.status(200).json({ message: "Data Added" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "Error" });
    }
  } else {
    try {
      for (const item of files) {
        await Marksheet.create({
          file: item.file,
          filename: item.filename,
          type: item.type,
          size: item.size,
          createdBy: req.user.familyId,
        });
      }
      return res.status(200).json({ message: "Data Added" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "Error" });
    }
  }
}

async function getAadhar(req, res) {
  try {
    // console.log(req.user);
    const familyId = req.user.familyId; // Assuming req.user.familyId is available

    const files = await Aadhar.find({ createdBy: familyId });

    return res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching Aadhar data:", error);
    return res.status(500).json({ msg: "Error fetching data" });
  }
}

async function getPan(req, res) {
  try {
    const familyId = req.user.familyId; // Assuming req.user.familyId is available

    const files = await Pan.find({ createdBy: familyId });

    return res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching Aadhar data:", error);
    return res.status(500).json({ msg: "Error fetching data" });
  }
}

async function getVoterId(req, res) {
  try {
    const familyId = req.user.familyId; // Assuming req.user.familyId is available

    const files = await VoterId.find({ createdBy: familyId });

    return res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching Aadhar data:", error);
    return res.status(500).json({ msg: "Error fetching data" });
  }
}

async function verifyMemeber(req, res) {
  // console.log(req.user.familyId);
  return res.status(200).json({ mwssage: "Done" });
}

async function getMarkSheet(req, res) {
  try {
    const familyId = req.user.familyId; // Assuming req.user.familyId is available

    const files = await Marksheet.find({ createdBy: familyId });

    return res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching Aadhar data:", error);
    return res.status(500).json({ msg: "Error fetching data" });
  }
}

async function getLicense(req, res) {
  try {
    const familyId = req.user.familyId; // Assuming req.user.familyId is available

    const files = await License.find({ createdBy: familyId });

    return res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching Aadhar data:", error);
    return res.status(500).json({ msg: "Error fetching data" });
  }
}

async function deleteAadhar(req, res) {
  try {
    const { id } = req.params;
    await Aadhar.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deletePan(req, res) {
  try {
    const { id } = req.params;
    await Pan.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteMarksheet(req, res) {
  try {
    const { id } = req.params;
    await Marksheet.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteVoterId(req, res) {
  try {
    const { id } = req.params;
    await VoterId.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteLicense(req, res) {
  try {
    const { id } = req.params;
    await License.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
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
  // putPost,
  // getPost,
};
