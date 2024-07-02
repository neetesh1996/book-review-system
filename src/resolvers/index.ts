import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    books: () => prisma.book.findMany(),
    reviews: () => prisma.review.findMany(),
    user: (_: any, { id }: { id: number }) => prisma.user.findUnique({ where: { id } }),
    book: (_: any, { id }: { id: number }) => prisma.book.findUnique({ where: { id } }),
    review: (_: any, { id }: { id: number }) => prisma.review.findUnique({ where: { id } }),
    getBooks: () => prisma.book.findMany(),
    getBook: (_: any, { id }: { id: number }) => prisma.book.findUnique({ where: { id } }),
    getReviews: (_: any, { bookId }: { bookId: number }) => prisma.review.findMany({ where: { bookId } }),
    getMyReviews: (_: any, __: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return prisma.review.findMany({ where: { userId: context.user.userId } });
    },
  },
  Mutation: {
    register: async (_: any, { username, email, password }: { username: string, email: string, password: string }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
      return { token: generateToken(user), user };
    },
    login: async (_: any, { email, password }: { email: string, password: string }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('No user found with this email');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      return { token: generateToken(user), user };
    },
    addBook: async (_: any, { title, author, publishedYear }: { title: string, author: string, publishedYear: number }, context: any) => {
        if (!context.user) {
            throw new Error('Not authenticated');
          }
      return prisma.book.create({
        data: { title, author, publishedYear },
      });
    },
    addReview: async (_: any, { bookId, rating, comment }: { bookId: number, rating: number, comment: string }, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return prisma.review.create({
        data: { userId: context.user.userId, bookId, rating, comment },
      });
    },
    updateReview: async (_: any, { id, rating, comment }: { id: number, rating?: number, comment?: string }, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      const review = await prisma.review.findUnique({ where: { id } });

      if (!review) {
        throw new Error('Review not found');
      }

      if (review.userId !== context.user.userId) {
        throw new Error('Not authorized');
      }

      return prisma.review.update({
        where: { id },
        data: { rating, comment },
      });
    },
    deleteReview: async (_: any, { id }: { id: number }, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      const review = await prisma.review.findUnique({ where: { id } });

      if (!review) {
        throw new Error('Review not found');
      }

      if (review.userId !== context.user.userId) {
        throw new Error('Not authorized');
      }

      return prisma.review.delete({
        where: { id },
      });
    },
  },
  User: {
    reviews: (parent: any) => prisma.review.findMany({ where: { userId: parent.id } }),
  },
  Book: {
    reviews: (parent: any) => prisma.review.findMany({ where: { bookId: parent.id } }),
  },
  Review: {
    user: (parent: any) => prisma.user.findUnique({ where: { id: parent.userId } }),
    book: (parent: any) => prisma.book.findUnique({ where: { id: parent.bookId } }),
  },
};
