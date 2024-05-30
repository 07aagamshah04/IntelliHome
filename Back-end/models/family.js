const mongoose = require("mongoose");

//Schema designing of Mongoose
const familySchema = new mongoose.Schema(
  {
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      validate: {
        validator: function (array) {
          return array.length <= 5;
        },
        message: "A family can have a maximum of 5 members",
      },
    },
  },
  { timestamps: true }
);
//Now making model of this schema
const Family = mongoose.model("families", familySchema);

module.exports = Family;
