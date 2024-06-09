const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const cors = require("cors");

const app = express();
const server = createServer(app);
const PORT = process.env.PORT_SERVER || 5000;
const MONGO_URL = process.env.MONGO_URL;
const { ConnectMongoDB } = require("./connection");
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "family",
    required: true,
  },
  SendedBy: {
    type: String,
    required: true,
  },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("chat", chatSchema);

// CORS configuration
const corsOptions = {
  origin: "https://intelli-home.netlify.app",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

// Route to get chat messages
app.get("/api/chats/:familyId", async (req, res) => {
  try {
    const { familyId } = req.params;
    // console.log(familyId);
    const messages = await Chat.find({ CreatedBy: familyId });
    // .sort({ timestamp: -1 });
    // .populate("CreatedBy", "name")
    // .populate("SendedBy", "username")
    // Sort messages by timestamp in descending order
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat messages", error });
  }
});

// Connect to MongoDB
ConnectMongoDB(MONGO_URL)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch((error) => {
    console.log("mongoose error", error);
  });

// Setting up Socket.IO with CORS options
const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  // console.log("User connected ", socket.id);

  // Handle incoming messages
  socket.on("message", async (data) => {
    // console.log(data);

    // Save the message to the database
    const { CreatedBy, SendedBy, text } = data;
    const newMessage = new Chat({ CreatedBy, SendedBy, text });
    try {
      const savedMessage = await newMessage.save();
      // console.log("Message saved to database:", savedMessage);

      // Emit the message to the room
      io.to(CreatedBy).emit("receive-message", savedMessage);
    } catch (error) {
      // console.error("Error saving the message:", error);
      throw new Error(error);
    }
  });

  // Handle joining rooms
  socket.on("join-room", (room) => {
    socket.join(room);
    // console.log(`User joined room ${room}`);
  });

  socket.on("disconnect", () => {
    // console.log(`${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON PORT :- ", PORT);
});
