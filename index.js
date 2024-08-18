const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const SectionsModel = require("./models/CardData");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/help-center");

app.get("/cards", (req, res) => {
  SectionsModel.find()
    .then((sections) => res.json(sections))
    .catch((error) => res.json(error));
});

app.get("/cards/:title", (req, res) => {
  const title = req.params.title.toLowerCase();

  SectionsModel.find({ title: new RegExp(`^${title}$`, "i") })
    .then((sections) => {
      if (sections.length > 0) {
        res.json(sections);
      } else {
        res.status(404).json({ message: "Card not found" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

app.post("/cards", (req, res) => {
  const { title, description, link } = req.body;

  if (!title || !description || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newCard = new SectionsModel({
    title,
    description,
    link,
  });

  newCard
    .save()
    .then((card) => res.status(201).json(card))
    .catch((error) => res.status(500).json({ message: error.message }));
});

app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
