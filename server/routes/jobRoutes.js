import express from 'express';
import { createJob, getJobs } from '../controllers/jobController.js';

const router = express.Router();

router.post('/', createJob); //POST/api/jobs
router.get('/', getJobs); //GET/api/jobs

export default router;