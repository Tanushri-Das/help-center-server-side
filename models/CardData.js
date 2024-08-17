const mongoose = require("mongoose");

const SectionsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const SectionsModel = mongoose.model("sections", SectionsSchema);

module.exports = SectionsModel;
