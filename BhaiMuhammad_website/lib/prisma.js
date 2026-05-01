import { PrismaClient } from '../prisma/generated/client/index.js';

const globalForPrisma = global;

/** @type {PrismaClient} */
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
