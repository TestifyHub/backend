const integrationSchema = require("../models/IntegrationModel");

const getAllIntegrations = async (req, res) => {
  try {
    const integrations = await integrationSchema.find();
    res.json(integrations);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const getIntegrationByType = async (req, res) => {
  try {
    const integrations = await integrationSchema.find({
      type: { $in: [req.params.type] },
    });
    res.json(integrations);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { getAllIntegrations, getIntegrationByType };
