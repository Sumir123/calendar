const express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Events = mongoose.model("Events", eventSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/events", (req, res) => {
  const event = new Events({
    title: req.body.title,
    date: req.body.date,
  });

  event
    .save()
    .then(() => {
      console.log("One entry added");
      res.status(201).send("Event added successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error adding event");
    });
});

app.get("/api/events", (req, res) => {
  var query = Events.find({}).select("title date -_id");
  query.exec((err, found) => {
    if (err) {
      console.log(err);
      res.send("Some error occured!");
    }
    res.send(found);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
