const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const integrationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: [
    {
      type: String,
    },
  ],
  path: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("integration", integrationSchema);
