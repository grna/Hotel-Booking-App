const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/hotel-booking-app-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Room = mongoose.model(
  "rooms",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    numbers: [Number],
    title: String,
    category: String,
    features: [String],
    image: String,
    price: Number,
  })
);

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.get("/api/rooms", async (req, res) => {
  const rooms = await Room.find({});
  res.send(rooms);
});

app.post("/api/rooms", async (req, res) => {
  const newRoom = new Room(req.body);
  const savedRoom = await newRoom.save();
  res.send(savedRoom);
});

app.delete("/api/rooms/:id", async (req, res) => {
  const deletedRoom = await Room.findByIdAndDelete(req.params.id);
  res.send(deletedRoom);
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("serve at http://localhost:3001"));
