const express = require("express");
const router = express.Router();
const spaceSchema = require("../models/SpaceModel");
const { upload } = require("../utils/cloudinary");
const spaceController = require("../controllers/SpaceController");

router.post("/newspace", upload.single("image"), spaceController.newSpace);

router.post("/getallspaces", spaceController.getSpacesByUserId);

router.post("/getspace", spaceController.getSpaceById);

router.delete("/deletespace/:id", spaceController.deleteSpace);

module.exports = router;
