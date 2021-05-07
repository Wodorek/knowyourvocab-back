import jwt from 'jsonwebtoken';

export const signToken = (data: Object, expiry: string) => {
  const token = jwt.sign(data, process.env.JWT_STRING as string, {
    expiresIn: expiry,
  });
  return token;
};
