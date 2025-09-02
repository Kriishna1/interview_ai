import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model'; 

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    const decoded = jwt.verify(token, jwtSecret) as { user: { id: string } };
    req.user = await UserModel.findById(decoded.user.id);
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
    next();
  } catch (err) {
    console.error('Error in auth middleware:', err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
