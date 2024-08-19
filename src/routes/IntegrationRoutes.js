const express = require("express");
const router = express.Router();
const integrationController = require("../controllers/IntegrationController.js");

router.get("/", integrationController.getAllIntegrations);
router.get("/:type", integrationController.getIntegrationByType);

module.exports = router;
