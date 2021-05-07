import { authenticate } from 'passport';
import { Request, Response, NextFunction } from 'express';

export const hasToken = (req: Request, res: Response, next: NextFunction) => {
  authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (info) {
      return res.status(401).json({ message: info.message });
    }

    if (!user) {
      return res.status(401).json({ message: 'Login failed, try again' });
    }

    next();
  })(req, res, next);
};
