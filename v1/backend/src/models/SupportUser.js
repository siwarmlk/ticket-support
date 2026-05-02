const mongoose = require('mongoose');

const supportUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const SupportUser = mongoose.model('SupportUser', supportUserSchema);

module.exports = { SupportUser };
