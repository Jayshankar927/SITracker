import express from 'express';
import { createJob, deleteJob, getJobs } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createJob); //POST/api/jobs
router.get('/', protect, getJobs); //GET/api/jobs
router.delete('/:id', protect, deleteJob); //DELETE/api/jobs

export default router;