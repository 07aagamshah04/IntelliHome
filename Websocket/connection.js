const mongoose = require("mongoose");

async function ConnectMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  ConnectMongoDB,
};
