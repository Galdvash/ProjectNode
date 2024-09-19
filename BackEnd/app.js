import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // טעינת משתני סביבה

const app = express();

// Middleware
app.use(express.json()); // לטיפול ב-JSON מבקשות HTTP
app.use(cors()); // לאפשר קריאות ממקורות אחרים (CORS)
app.use(morgan("dev")); // לוגים של בקשות נכנסות

// Routes
app.use("/users", userRoutes); // ניתוב למשתמשים
app.use("/cards", cardRoutes); // ניתוב לכרטיסים
app.use("/auth", authRoutes); // ניתוב להרשאות (רישום והתחברות)

// חיבור למסד הנתונים
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/NodeDataBase")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(`MongoDB connection error: ${error}`));

// הפעלת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
