import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const signupUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('Username or email already in use');
  }
  const user = new User({ username, email, password });
  await user.save();
  const token = generateToken(user);
  return { user: { id: user._id, username: user.username, email: user.email, role: user.role }, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  const token = generateToken(user);
  return { user: { id: user._id, username: user.username, email: user.email, role: user.role }, token };
};
