import { Request, Response, NextFunction } from 'express';
import Student from '../models/student';
import { sendNotification } from '../util/sendNotification';

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
  await sendNotification(name).catch((err) => console.log(err));
  return res.status(201).json({ message: 'diagnosis posted' });
};
