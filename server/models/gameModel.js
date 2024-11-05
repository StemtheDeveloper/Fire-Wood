const mongoose = require('mongoose');

const playedCardSchema = new mongoose.Schema({
    cardId: String,
    position: Number
});

const playerSchema = new mongoose.Schema({
    playerId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    deck: [String],
    playedCards: [playedCardSchema]
});

const gameSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        default: Date.now
    },
    players: [playerSchema],
    gameBoard: {
        cells: [mongoose.Schema.Types.Mixed]
    },
    cardsInGame: [String]
});

module.exports = mongoose.model('Game', gameSchema);
