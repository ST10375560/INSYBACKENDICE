import User from '../models/User.js';

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateMe = async (req, res) => {
  try {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const promoteUserToAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: { role: 'admin' } }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User promoted to admin', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const demoteUserFromAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: { role: 'user' } }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User demoted to user', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { getMe, getUserById, deleteUserById, updateMe, promoteUserToAdmin, demoteUserFromAdmin, getAllUsers };
