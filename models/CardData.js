const mongoose = require("mongoose");

const SectionsSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const SectionsModel = mongoose.model("sections", SectionsSchema);

module.exports = SectionsModel;
