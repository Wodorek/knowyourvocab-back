import express from 'express';

import { wakeUp } from '../controllers/wakeup-controllers';

export const router = express.Router();

router.get('/wakeUp', wakeUp);
