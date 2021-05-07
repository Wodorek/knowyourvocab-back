import express from 'express';
import { sanitizers } from '../middleware/sanitizers';
import { signup, login } from '../controllers/auth-controllers';
import { hasToken } from '../middleware/auth.ms';

export const router = express.Router();

router.post('/signup', sanitizers, signup);
router.post('/login', hasToken, login);
