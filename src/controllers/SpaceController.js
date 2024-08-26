const spaceSchema = require("../models/SpaceModel")
const getSpaceById = async (req, res) => {
    console.log(req.body)
    try {
      const spaces = await spaceSchema.find({
        userId: req.body.userId,

      });
      res.status(201).json(spaces);
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  };
  
module.exports = {getSpaceById}