const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/NOTEBOOK";

const connectToMongo = () => {
  mongoose.connect(mongoURI)
  .then(() => {
    console.log("Mongoose connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
}

module.exports = connectToMongo;

