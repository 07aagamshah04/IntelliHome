const mongoose = require("mongoose");

//Schema designing of Mongoose
const fileSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//Now making model of this schema
const Files = mongoose.model("files", fileSchema);

module.exports = Files;
