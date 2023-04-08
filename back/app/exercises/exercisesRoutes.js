import express from 'express';
import { addExercises, deleteExercises, getExercises, updateExercise,  } from './exercisesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').post(protect, addExercises)
router.route('/').get(protect, getExercises)
router.route('/:id').put(protect, updateExercise).delete(protect ,deleteExercises)





export default router