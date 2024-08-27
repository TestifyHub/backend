const express = require("express");
const router = express.Router();
const { upload } = require("../utils/cloudinary");
const reviewController = require("../controllers/ReviewController");

router.post("/submit-text-review", upload.single("image"), reviewController.addTextReview);
router.post("/submit-video-review", upload.single("video"), reviewController.addVideoReview);

router.get("/reviews/:spaceId", reviewController.getReviewsBySpaceId);
router.get("/reviews/:spaceId/liked", reviewController.getLikedReviewsBySpaceId);
router.get("/reviews/:spaceId/text", reviewController.getTextReviewsBySpaceId);
router.get("/reviews/:spaceId/video", reviewController.getVideoReviewsBySpaceId);

router.post('/reviews/:reviewId/like', reviewController.likeReview);

module.exports = router;