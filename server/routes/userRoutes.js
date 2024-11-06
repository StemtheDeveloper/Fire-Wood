import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, email, username, profilePicture } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    // Create new user
    const newUser = new User({
      userId,
      email,
      username,
      profilePicture
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findOne({ userId: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put('/:userId', async (req, res) => {
    try {
      const { username, profilePicture } = req.body;
      const user = await User.findOneAndUpdate(
        { userId: req.params.userId },
        { 
          username,
          profilePicture
        },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;