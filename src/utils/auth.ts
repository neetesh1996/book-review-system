import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || '34we5r6tyouplhikjhgfvdcszfxgchjkllkjgdfseafghjkl';

export const generateToken = (user: User) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
