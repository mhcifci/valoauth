var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
},{timestamps: {createdAt: 'createdAt'}});

module.exports = mongoose.model("users", userSchema);