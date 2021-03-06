const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");
const validator = require("validator");
const SimpleCrypto = require("simple-crypto-js").default;

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
    title: String,
    category: String,
    features: [String],
    image: String,
    price: Number,
    quantity: Number,
  })
);

const Order = mongoose.model(
  "orders",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    dateFrom: Date,
    dateTo: Date,
    numberOfAdults: Number,
    numberOfChildren: Number,
    rooms: String,
    total: Number,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  })
);

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    token: {
      type: String,
      default: shortid.generate,
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  })
);

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const verifyPassword = (dbPass, uiPass) => {
  const secretKey = "/.awdT613sevn';@aa&^J2";
  const simpleCrypto = new SimpleCrypto(secretKey);
  return (
    simpleCrypto.decrypt(dbPass) === simpleCrypto.decrypt(uiPass)
  );
};

// For testing only
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// For testing only
app.delete("/api/users", async (req, res) => {
  const deletedUsers = await User.deleteMany();
  res.send(deletedUsers);
});

app.post("/api/users", async (req, res) => {
  User.exists({ email: req.body.email }, async (err, exists) => {
    if (!exists) {
      res.status(400).send("User does not exist");
      return;
    }

    const users = await User.find({ email: req.body.email });

    if (!verifyPassword(users[0].password, req.body.password)) {
      res.status(401).send("Incorrect password");
      return;
    }
    res.json(users[0]);
  });
});

app.put("/api/users", async (req, res) => {
  User.exists({ email: req.body.email }, async (err, exits) => {
    if (exits) {
      res.status(400).send("User already exists");
    } else {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.json(savedUser);
    }
  });
});

app.get("/api/rooms", async (req, res) => {
  const rooms = await Room.find({});
  res.send(rooms);
});

app.post("/api/rooms", async (req, res) => {
  const newRoom = new Room(req.body);
  const savedRoom = await newRoom.save();
  res.send(savedRoom);
});

// For testing only
app.delete("/api/rooms/:id", async (req, res) => {
  const deletedRoom = await Room.findByIdAndDelete(req.params.id);
  res.send(deletedRoom);
});

app.get("/api/orders", async (req, res) => {
  if (
    !validator.isDate(req.query.from, { format: "YYYY-MM-DD" }) ||
    !validator.isDate(req.query.to, { format: "YYYY-MM-DD" })
  ) {
    res.status(400).json("Invalid date format in the query string!");
  } else {
    let from = new Date(req.query.from);
    let to = new Date(req.query.to);

    const orders = await Order.find({
      dateFrom: { $lte: to },
      dateTo: { $gte: from },
    });

    res.send(orders);
  }
});

app.get("/api/orders/:email", async (req, res) => {
  const orders = await Order.find({ email: req.params.email });
  res.send(orders);
});

app.post("/api/orders", async (req, res) => {
  const newOrder = new Order(req.body);
  const savedOrder = await newOrder.save();
  res.send(savedOrder);
});

app.delete("/api/orders/:id", async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  res.send(deletedOrder);
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("serve at http://localhost:3001"));
