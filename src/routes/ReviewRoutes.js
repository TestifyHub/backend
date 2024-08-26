const express = require("express");
const router = express.Router();
const { upload } = require("../utils/cloudinary");
const reviewController = require("../controllers/ReviewController");

router.post("/submit-text-review", upload.single("image"), reviewController.addTextReview);

module.exports = router;