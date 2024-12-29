const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const foodItemsRoutes = require("./routes/FoodItems");

const app = express();

// Set up CORS
app.use(cors({
    origin: "http://localhost:27017", // Adjust this if your frontend runs on a different port
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
app.use('/uploads', express.static('uploads'));

// Middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/foodhut")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/food-items', foodItemsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
