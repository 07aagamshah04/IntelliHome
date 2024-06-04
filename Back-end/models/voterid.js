const mongoose = require("mongoose");

//Schema designing of Mongoose
const voteridSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "family",
    },
  },
  { timestamps: true }
);
//Now making model of this schema
const VoterId = mongoose.model("voterid", voteridSchema);

module.exports = VoterId;
