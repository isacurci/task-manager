import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  moveTaskStatus,
} from '../controllers/taskController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/move', moveTaskStatus);

export default router; 