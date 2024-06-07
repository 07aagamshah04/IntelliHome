// backend/models/Message.js
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

module.exports = Chat;
