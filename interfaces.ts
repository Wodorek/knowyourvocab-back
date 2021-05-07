import { Request } from 'express';

export interface IAnswers {
  answers: string[];
}

export interface IStudent {
  name: string;
  dateSubmitted: Date;
  goodAnswers: IAnswers[];
  badAnswers: IAnswers[];
}

export interface IAdmin {
  username: string;
  password?: string;
}

export interface ReqUser extends Request {
  user?: {
    username?: string;
  };
}
