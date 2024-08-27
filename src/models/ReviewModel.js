const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  spaceId: { type: Schema.Types.ObjectId, ref: "space", required: true },
  type: { type: String, required: true, enum: ["video", "text"] },
  rating: { type: Number, required: true, min: 0, max: 5, default: 5 },
  text: { type: String },
  video: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  liked: {type: Boolean, default: false},
});

module.exports = mongoose.model("review", reviewSchema);
