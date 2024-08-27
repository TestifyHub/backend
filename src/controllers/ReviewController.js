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

const getReviewsBySpaceId = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const reviews = await reviewSchema.find({ spaceId });
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

const getLikedReviewsBySpaceId = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const reviews = await reviewSchema.find({ spaceId, liked: true });
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    console.error("Error fetching liked reviews:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

const getTextReviewsBySpaceId = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const reviews = await reviewSchema.find({ spaceId, type: "text" });
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    console.error("Error fetching text reviews:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

const getVideoReviewsBySpaceId = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const reviews = await reviewSchema.find({ spaceId, type: "video" });
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    console.error("Error fetching video reviews:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

const likeReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    
    review.liked = !review.liked;
    await review.save();

    res.json(review);
  } catch (error) {
    console.error("Error liking review:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addTextReview,
  addVideoReview,
  getReviewsBySpaceId,
  getLikedReviewsBySpaceId,
  getTextReviewsBySpaceId,
  getVideoReviewsBySpaceId,
  likeReview,
};
