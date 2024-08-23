const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  fullName: { type: String },
  googleId: { type: String },
  profilePicUrl: { type: String, default: "/userIcon.svg" },
});

userSchema.index(
  { googleId: 1 },
  {
    unique: true,
    partialFilterExpression: { googleId: { $ne: null } },
  }
);

module.exports = mongoose.model("user", userSchema);
