const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const Venue = require('./models/venueModel'); // Make sure to import the Venue model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

// Routes

// API route to fetch all venues
// API route to fetch only birthday venues
app.get("/api/venues/birthday", async (req, res) => {
  try {
    const venues = await Venue.find({ eventTypes: "Birthday" }); // Filter by "Birthday"
    res.status(200).json({ success: true, venues });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch birthday venues" });
  }
});

app.get("/api/venues/pool", async (req, res) => {
  try {
    const venues = await Venue.find({ eventTypes: "Pool" }); // Filter by "Birthday"
    res.status(200).json({ success: true, venues });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch pool venues" });
  }
});

app.get("/api/venues/party", async (req, res) => {
  try {
    const venues = await Venue.find({ eventTypes: "Party" }); // Filter by "Birthday"
    res.status(200).json({ success: true, venues });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch party venues" });
  }
});

app.get("/api/venues/wedding", async (req, res) => {
  try {
    const venues = await Venue.find({ eventTypes: "Wedding" }); // Filter by "Birthday"
    res.status(200).json({ success: true, venues });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch party venues" });
  }
});


app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
