const User = require("../models/users");
const nodeMailer = require("nodemailer");
// const Files = require("../models/files");

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

// async function putPost(req, res) {
//   const body = req.body;

//   if (!body || !body.file || !body.title || !body.text) {
//     return res.status(400).json({ msg: "All fields are requireedee" });
//   }
//   // console.log(body);
//   const result = await Files.create({
//     file: body.file,
//     title: body.title,
//     text: body.text,
//   });
//   return res.status(200).json({ msg: "Post added succesfully" });
// }

// async function getPost(req, res) {
//   try {
//     const posts = await Files.findById("665192a5032c310fb74878e8");
//     console.log(posts);
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to fetch posts", error });
//   }
// }

module.exports = {
  GetAllUsers,
  GetuserById,
  UpdateuserByid,
  DeleteuserByid,
  sendEmail,
  verifyEmail,
  // putPost,
  // getPost,
};
