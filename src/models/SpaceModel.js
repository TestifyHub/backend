const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spaceSchema = new Schema(
  {
    spaceName: { type: String, required: true },
    image: { type: String },
    header: { type: String, required: true },
    message: { type: String, required: true },
    questions: [
      {
        id: { type: String },
        text: { type: String },
      },
    ],
    color: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    liked: { type: Boolean, default: false },
  }
);

module.exports = mongoose.model("space", spaceSchema);
