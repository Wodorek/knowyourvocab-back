import { Request, Response, NextFunction } from 'express';

import Student from '../models/student';

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let students;
  try {
    students = await Student.find(
      {},
      {
        name: 1,
        dateSubmitted: 1,
      }
    );
  } catch (error) {
    return new Error(error);
  }

  return res.status(200).send({ students: students });
};

export const getOneStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.params.username;

  let student;
  try {
    student = await Student.findOne(
      { name: name },
      {
        _id: 0,
        name: 1,
        goodAnswers: 1,
        badAnswers: 1,
      }
    );
  } catch (error) {
    return new Error(error);
  }
  return res.status(200).send({ student: student });
};
