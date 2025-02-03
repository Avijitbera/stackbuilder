import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestType } from '../RequestType';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';



export const authenticate = (req: RequestType, res: Response, next: NextFunction):any => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    // next();
    return Promise.resolve(next());
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};