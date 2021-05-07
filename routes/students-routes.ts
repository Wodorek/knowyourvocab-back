import express from 'express';

import { postDiagnosis } from '../controllers/students-controllers';

export const router = express.Router();

router.post('/postDiagnosis', postDiagnosis);
