const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const SectionsModel = require("./models/CardData");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@projects.x1epn.mongodb.net/?retryWrites=true&w=majority&appName=projects`;

console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const sectionsCollection = client.db("help-center-project").collection("sections");

    app.get("/cards", async (req, res) => {
      try {
        const sections = await sectionsCollection.find().toArray(); 
        res.json(sections);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch sections", error });
      }
    });

    app.get("/cards/:title", async (req, res) => {
      try {
        const title = req.params.title.toLowerCase();
        const section = await sectionsCollection.findOne({
          title: new RegExp(`^${title}$`, "i"),
        });

        if (section) {
          res.json([section]);
        } else {
          res.status(404).json({ message: "Card not found" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.post("/cards", async (req, res) => {
      try {
        const newSectionData = new SectionsModel(req.body);
        await newSectionData.validate();

        const result = await sectionsCollection.insertOne(newSectionData);
        res.json(result);
      } catch (error) {
        console.error("Error in POST /cards:", error.message);
        res
          .status(500)
          .json({ message: "Failed to create section", error: error.message });
      }
    });
  } finally {

  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
