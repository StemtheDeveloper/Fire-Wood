const mongoose = require('mongoose');

const specialAbilitySchema = new mongoose.Schema({
    description: String,
    type: {
        type: [String],
        enum: ['Damage', 'Heal', 'Shield', 'Convert', 'Poison', 'Draw']
    },
    trigger: {
        type: [String],
        enum: ['Attack', 'Move', 'Proximity', 'Turn start', 'Draw', 'Enemy played a card', 'You played a card']
    },
    proximityCondition: Number,
    duration: String,
    effectValue: String,
    targetIds: [String]
});

const cardSchema = new mongoose.Schema({
    cardId: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: String,
        required: true
    },
    cardName: {
        type: String,
        required: true
    },
    rarity: {
        type: Number,
        required: true,
        min: 1
    },
    stats: {
        defense: { type: Number, required: true },
        attack: { type: Number, required: true },
        speed: { type: Number, required: true },
        energy: { type: Number, required: true },
        health: { type: Number, required: true },
        accuracy: { type: Number, required: true }
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    specialAbility: specialAbilitySchema
});

module.exports = mongoose.model('Card', cardSchema);
