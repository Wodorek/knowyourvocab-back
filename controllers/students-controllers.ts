import { Request, Response, NextFunction } from 'express';
import Student from '../models/student';

export const postDiagnosis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, goodAnswers, badAnswers } = req.body;

  const newStudent = new Student({
    name,
    goodAnswers,
    badAnswers,
  });

  try {
    await newStudent.save();
  } catch (error) {
    return res.status(500).json({
      message: 'Wysyłanie nie powiodło się, spróbuj ponownie później',
    });
  }
  return res.status(201).json({ message: 'diagnosis posted' });
};
