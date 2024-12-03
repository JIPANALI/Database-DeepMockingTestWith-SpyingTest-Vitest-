import { PrismaClient } from '@prisma/client'
import { mockDeep } from 'vitest-mock-extended'
//here you can see the mocking out all of the thing for testing only  so inside the test// index.test.ts where will use mock("../db")==>
// it will refere from here from this mock out //

export const prismaClient = mockDeep<PrismaClient>()//it will mockout which is use in index.test.ts //deeply means everything which will use with PrismaClient