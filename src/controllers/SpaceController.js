const spaceSchema = require("../models/SpaceModel");
const getSpacesByUserId = async (req, res) => {
  console.log(req.body);
  try {
    const spaces = await spaceSchema.find({
      userId: req.body.userId,
    });
    res.status(201).json(spaces);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const getSpaceById = async (req, res) => {
  const { id } = req.body;

  try {
    const space = await spaceSchema.findById(id);

    if (!space) {
      return res.status(404).json({ found: false, msg: "Space not found" });
    }

    res.status(200).json({ found: true, space });
  } catch (err) {
    console.error(err);
    res.status(500).json({ found: false, msg: "Server Error" });
  }
};

module.exports = { getSpacesByUserId, getSpaceById };
