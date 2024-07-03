import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || '34we5r6tyouplhikjhgfvdcszfxgchjkllkjgdfseafghjkl';
// generate token
export const generateToken = (user: User) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
};
// auth middleware for verifying token
export const verifyToken = (token: string) => {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
};
