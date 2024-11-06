// server/models/cardModel.js
import mongoose from 'mongoose';

const specialAbilitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  trigger: {
    type: String,
    required: true
  },
  proximityCondition: {
    type: Number,
    default: 1
  },
  duration: {
    type: String,
    required: false
  },
  effectValue: {
    type: String,
    required: false
  },
  targetIds: [String]
});

const cardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  rarity: {
    type: Number,
    required: true,
    min: 1,
    max: 10000
  },
  defense: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  attack: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  speed: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  energy: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  health: {
    type: Number,
    required: true,
    min: 0,
    max: 500  // Updated to match form max
  },
  accuracy: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  specialAbility: specialAbilitySchema
});

// Add proper error handling
cardSchema.pre('save', function(next) {
  if (!this.imageUrl) {
    next(new Error('Image URL is required'));
  }
  next();
});

export default mongoose.model('Card', cardSchema);