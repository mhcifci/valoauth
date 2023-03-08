var mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
  mongoose.connect(process.env.ATLAS_URI);
  mongoose.set('strictQuery', true);
  mongoose.connection.on("open", () => {
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB: Error", err);
  });

  mongoose.Promise = global.Promise;
};
