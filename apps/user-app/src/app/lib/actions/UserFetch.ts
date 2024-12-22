"use server"
import prisma from "@repo/db/client";   
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export default async function userFetch() {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
        where: { 
            id: Number(session?.user.id),
         },
    });
    return user;
}