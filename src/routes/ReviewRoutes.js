const express = require("express");
const router = express.Router();
const { upload } = require("../utils/cloudinary");
const reviewController = require("../controllers/ReviewController");

router.post("/submit-text-review", upload.single("image"), reviewController.addTextReview);
router.post("/submit-video-review", upload.single("video"), reviewController.addVideoReview);

module.exports = router;