const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    stats: {
        wins: { type: Number, default: 0 },
        draws: { type: Number, default: 0 },
        losses: { type: Number, default: 0 }
    },
    gameIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    ownedCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
});

module.exports = mongoose.model('User', userSchema);
