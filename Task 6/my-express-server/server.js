require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
