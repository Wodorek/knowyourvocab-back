import express from 'express';
import { authenticate } from 'passport';

import { getOneStudent, getStudents } from '../controllers/admin-controllers';

export const router = express.Router();

router.get('/getStudents', authenticate('jwt'), getStudents);
router.get('/students/:username', authenticate('jwt'), getOneStudent);
