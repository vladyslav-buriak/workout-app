import express from 'express';
import { addExercises } from './exercisesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').post(protect, addExercises)

export default router