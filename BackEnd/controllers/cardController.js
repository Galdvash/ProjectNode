// controllers/cardController.js
import Card from "../models/cardModel.js";

// Create a new card (Business user only)
export const createCard = async (req, res) => {
  try {
    const cardData = { ...req.body, createdBy: req.user.id };
    const card = new Card(cardData);
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cards (Public)
export const getUserCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific card by ID (Public)
export const getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a card (Card creator or admin only)
export const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });

    if (card.createdBy.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "User not authorized" });
    }

    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a card (Card creator or Admin only)
export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });

    if (card.createdBy.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "User not authorized" });
    }

    await card.deleteOne();
    res.status(200).json({ message: "Card removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
