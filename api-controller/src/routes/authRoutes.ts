import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);

export default router; 