import { PrismaClient } from '@prisma/client';
export type { Animal, Client } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
