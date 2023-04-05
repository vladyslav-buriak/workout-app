import express from 'express';
import { addExercises, getExercises } from './exercisesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').post(protect, addExercises)
router.route('/').get(protect, getExercises)

export default router