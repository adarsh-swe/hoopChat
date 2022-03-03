const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db); //connect returns a promise
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1); // exit process with failure
  }
};

module.exports = connectDB;
