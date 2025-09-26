import express from 'express';
import authController from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/validators.js';

const router = express.Router();

router.get('/login', (_req, res) => {
  res.send('Welcome to the PhotoShare API LOGIN ROUTE');
});

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

export default router;
