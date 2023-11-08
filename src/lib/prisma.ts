import { PrismaClient } from '@prisma/client';
export type { Fiche } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
