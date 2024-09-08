import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/NodeDataBase")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(`MongoDB connection error: ${error}`));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
