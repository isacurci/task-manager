import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Restrict all routes to admin role
router.use(restrictTo('ADMIN'));

router.route('/')
  .get(getUsers);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default router; 