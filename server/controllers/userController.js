import User from '../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const newUser = new User({ userId });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, profilePicture } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { username, profilePicture },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};