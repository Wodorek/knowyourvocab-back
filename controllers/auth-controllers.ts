import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Admin from '../models/admin';
import { ReqUser } from '../interfaces';
import { signToken } from '../util/signToken';

export const signup = async (req: Request, res: any, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(403)
      .json({ message: 'Please pick a valid password (min 8 characters)' });
  }

  const { username, password, verificationString } = req.body;

  if (verificationString !== (process.env.VERIFICATION_STR as string)) {
    return res.status(403).json({ message: 'Invalid validation string' });
  }

  let existingUser;

  try {
    existingUser = await Admin.findOne({ username: username });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Registration failed, try again later' });
  }

  if (existingUser) {
    return res.status(422).json({ message: 'Username already taken' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newAdmin = new Admin({
    username: username,
    password: hashedPassword,
  });

  try {
    await newAdmin.save();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Saving user failed, try again alater' });
  }
  const tokenExp = '3d';
  const token = signToken({ username: username }, tokenExp);

  return res
    .status(200)
    .json({ message: 'Creation successful', token: token, tokenExp: tokenExp });
};

export const login = async (
  req: ReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenExp = '3d';
    const token = signToken({ username: req?.user?.username }, tokenExp);

    res.status(200).json({ token: token, tokenExp: tokenExp });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
