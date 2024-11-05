const Card = require('../models/Card');

const cardController = {
    getAllCards: async (req, res) => {
        try {
            const cards = await Card.find();
            res.json(cards);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCardById: async (req, res) => {
        try {
            const card = await Card.findById(req.params.id);
            if (!card) return res.status(404).json({ message: 'Card not found' });
            res.json(card);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createCard: async (req, res) => {
        const card = new Card(req.body);
        try {
            const newCard = await card.save();
            res.status(201).json(newCard);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = cardController;