const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/booking-app-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Route = mongoose.model(
  "routes",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    river: String,
    hours: Number,
    complexity: Number,
    image: String,
  })
);

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.get("/api/routes", async (req, res) => {
  debugger;
  const routes = await Route.find({});
  res.send(routes);
});

app.post("/api/routes", async (req, res) => {
  const newRoute = new Route(req.body);
  const savedRoute = await newRoute.save();
  res.send(savedRoute);
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log("serve at http://localhost:5001"));
