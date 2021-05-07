import { check } from 'express-validator';
export const sanitizers = [
  check('username').toLowerCase().trim().escape(),
  check('password').isLength({ min: 8 }).trim().escape(),
];
