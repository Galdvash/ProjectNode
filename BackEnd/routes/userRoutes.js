import express from "express";
import { register, login } from "../controllers/authController.js";
import { getUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", authMiddleware, getUser);

export default router;
