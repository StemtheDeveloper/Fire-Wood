const Game = require('../models/Game');

const gameController = {
    createGame: async (req, res) => {
        const game = new Game(req.body);
        try {
            const newGame = await game.save();
            res.status(201).json(newGame);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getGameState: async (req, res) => {
        try {
            const game = await Game.findById(req.params.id);
            if (!game) return res.status(404).json({ message: 'Game not found' });
            res.json(game);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateGameState: async (req, res) => {
        try {
            const updatedGame = await Game.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json(updatedGame);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = gameController;
