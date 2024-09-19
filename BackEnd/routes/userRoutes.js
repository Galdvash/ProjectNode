// userRoutes.js

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// נתיבי הרשמה והתחברות
router.post("/register", registerUser);
router.post("/login", loginUser);

// נתיבי פרופיל משתמש (ממוקמים לפני '/:id')
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

// נתיבי אדמין
router.get("/", authMiddleware, adminMiddleware, getUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUser);
router.put("/:id", authMiddleware, adminMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
