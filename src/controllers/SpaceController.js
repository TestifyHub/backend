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

const newSpace = async (req, res) => {
  try {
    const { spaceName, header, message, questions, color, userId } = req.body;
    if (!spaceName || !header || !message || !questions || !color || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let imageUrl = "";
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
      image: imageUrl,
      userId,
    });
    const space = await newSpace.save();
    console.log(space);
    res.status(201).json({ success: true, space });
  } catch (err) {
    console.error("Error creating space:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

const deleteSpace = async (req, res) => {
  const { id } = req.params;
  try {
    const space = await spaceSchema.findById(id);
    if (!space) {
      return res.status(404).json({ found: false, msg: "Space not found" });
    }
    await spaceSchema.findByIdAndDelete(id);
    res.status(200).json({ found: true, msg: "Space deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ found: false, msg: "Server Error" });
  }
};
module.exports = { getSpacesByUserId, getSpaceById, newSpace, deleteSpace };
