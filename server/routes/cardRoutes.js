import express from 'express';
import Card from '../models/cardModel.js';
import fs from 'fs';
import path from 'path';

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

// Get a single card by ID
router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new card
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = [
      'cardName', 'imageUrl', 'ownerId', 
      'accuracy', 'health', 'energy', 
      'speed', 'attack', 'defense', 'rarity'
    ];
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

// Update a card
router.put('/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // If new image is provided and different from current, delete old image
    if (req.body.imageUrl && req.body.imageUrl !== card.imageUrl) {
      const oldImagePath = new URL(card.imageUrl).pathname;
      const fullPath = path.join(process.cwd(), 'public', oldImagePath);
      
      // Delete old image file if it exists
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;