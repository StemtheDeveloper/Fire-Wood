import express from 'express';
import Card from '../models/cardModel.js';

const router = express.Router();

// Get all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new card
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['cardName', 'imageUrl', 'ownerId'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const card = new Card(req.body);
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Card creation error:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors 
    });
  }
});

// Delete a card
router.delete('/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;