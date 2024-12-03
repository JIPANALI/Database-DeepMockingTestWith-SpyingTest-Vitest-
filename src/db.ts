import { PrismaClient } from "@prisma/client";
export const prismaClient = new PrismaClient();  //export bcz other  one also will use this for actually implementation not for testing only
