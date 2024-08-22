const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/UserSchema");

const ZodMiddleware = require("../middleware/ZodMiddleware");
const signupValidationSchema = require("../utils/signupValidationSchema");

const router = express.Router();

router.post(
  "/signup",
  ZodMiddleware.validateSchema(signupValidationSchema),
  async (req, res) => {
    console.log("inside signup");
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Check if the user already exists
      const existingUser = await userSchema.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new userSchema({
        email,
        password: hashedPassword,
        fullName,
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({ token, userId: newUser._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
