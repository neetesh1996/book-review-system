import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { importSchema } from 'graphql-import';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './utils/auth';

dotenv.config();

const prisma = new PrismaClient();
const typeDefs = importSchema('src/types/schema.graphql');
// apolo server 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    const user = verifyToken(token);
    return { prisma, user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
