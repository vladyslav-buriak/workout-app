import express from 'express';
import { addExercises } from './exercisesController.js';

const router = express.Router();
router.route('/').post( addExercises)

export default router