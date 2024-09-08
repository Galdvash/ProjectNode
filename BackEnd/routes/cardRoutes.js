import express from "express";
import {
  createCard,
  getCard,
  updateCard,
  deleteCard,
  getUserCards,
} from "../controllers/cardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new card (Business user only)
router.post("/", authMiddleware, createCard);

// Get all cards (Public)
router.get("/", getUserCards);

// Get a specific card by ID (Public)
router.get("/:id", getCard);

// Update a card (Card creator only)
router.put("/:id", authMiddleware, updateCard);

// Delete a card (Card creator or Admin only)
router.delete("/:id", authMiddleware, deleteCard);

export default router;
