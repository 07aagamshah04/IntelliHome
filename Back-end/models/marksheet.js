const mongoose = require("mongoose");

//Schema designing of Mongoose
const marksheetSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
    filename: {
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
const Marksheet = mongoose.model("marksheet", fileSchema);

module.exports = Marksheet;
