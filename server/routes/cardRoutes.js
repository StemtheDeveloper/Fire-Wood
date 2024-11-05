const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const { isAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/cards', cardController.getAllCards);
router.get('/cards/:id', cardController.getCardById);

// Admin only routes
router.post('/cards', isAdmin, cardController.createCard);

module.exports = router;
