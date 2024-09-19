// routes/cardRoutes.js
import express from "express";
import {
  createCard,
  getCard,
  updateCard,
  deleteCard,
  getUserCards,
} from "../controllers/cardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import businessMiddleware from "../middleware/businessMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, businessMiddleware, createCard);

router.get("/", getUserCards);

router.get("/:id", getCard);

router.put("/:id", authMiddleware, updateCard);

router.delete("/:id", authMiddleware, deleteCard);

export default router;
