import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true // Allows null values while maintaining uniqueness
  },
  userId: {
    type: String,
    required: true,
    unique: true // Firebase UID
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
  gameIds: [String],
  ownedCards: [String],
  isAdmin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('User', userSchema);