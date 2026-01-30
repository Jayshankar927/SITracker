import express from 'express';
import { createJob, deleteJob, getJobs } from '../controllers/jobController.js';

const router = express.Router();

router.post('/', createJob); //POST/api/jobs
router.get('/', getJobs); //GET/api/jobs
router.delete('/:id', deleteJob); //DELETE/api/jobs

export default router;