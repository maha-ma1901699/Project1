import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'development' && !prisma) {
  prisma = new PrismaClient();
} else {
  prisma = prisma || new PrismaClient();
}

export { prisma as db };
