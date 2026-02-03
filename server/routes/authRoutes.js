import express from 'express';
import { registerUSer, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUSer);
router.post('/login', loginUser);

export default router;