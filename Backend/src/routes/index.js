import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import photoRoutes from './photoRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/photo', photoRoutes);
router.use('/users', userRoutes);

export default router;
