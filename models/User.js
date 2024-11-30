const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  indexedEmail: {
    type: String,
    required: true,
    unique: true,
  },
  nonIndexedEmail: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
