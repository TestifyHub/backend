const reviewSchema = require("../models/ReviewModel");

const addTextReview = async (req, res) => {
  try {
    const { name, email, text, rating, spaceId, type } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path;
    }

    const newReview = new reviewSchema({
      name,
      email,
      text,
      rating,
      spaceId,
      type,
      image: imageUrl,
    });

    const review = await newReview.save();
    res.status(201).json({ success: true, review });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

const addVideoReview = async (req, res) => {
  console.log("inside add video review");
  try {
    const { name, email, rating, spaceId, type } = req.body;

    let videoUrl = "";
    if (req.file) {
      videoUrl = req.file.path;
    }

    const newReview = new reviewSchema({
      name,
      email,
      rating,
      spaceId,
      type,
      video: videoUrl,
    });

    const review = await newReview.save();
    res.status(201).json({ success: true, review });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = { addTextReview, addVideoReview };
