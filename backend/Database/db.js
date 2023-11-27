require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://acmproject:Peter231@acm.0xxilri.mongodb.net/test?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
