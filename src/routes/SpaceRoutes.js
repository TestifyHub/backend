const express = require("express");
const router = express.Router();
const spaceSchema = require("../models/SpaceModel");
const { upload } = require("../utils/cloudinary");
const spaceController = require("../controllers/SpaceController");

// POST /api/spaces
router.post("/newspace", upload.single("image"), async (req, res) => {
  try {
    const { spaceName, header, message, questions, color, userId } = req.body;
    if (!spaceName || !header || !message || !questions || !color || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let imageUrl = " ";
    if (req.file) {
      imageUrl = req.file.path;
    }
    console.log(req.file);
    console.log("imageUrl", imageUrl);
    const newSpace = new spaceSchema({
      spaceName,
      header,
      message,
      questions: JSON.parse(questions),
      color,
      image: imageUrl, // Store the image URL
      userId,
    });
    await newSpace.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Error creating space:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
});

router.post("/getallspaces",spaceController.getSpaceById);

module.exports = router;