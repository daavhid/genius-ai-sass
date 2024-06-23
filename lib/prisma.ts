import {PrismaClient} from "@prisma/client";

declare global{
    var prisma : PrismaClient | undefined;
}

const prismaDb = globalThis.prisma || new PrismaClient();
 
//what this does is to remove reassign an instance of the runnong prisma client

if(process.env.NODE_ENV!=='production') globalThis.prisma = prismaDb;

export default prismaDb;