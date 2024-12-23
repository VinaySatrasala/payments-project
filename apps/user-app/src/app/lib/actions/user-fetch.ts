"use server"

import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";   
import { authOptions } from "../auth";

export default async function userFetch() : Promise<{id: number, name: string | null, email: string | null, number: string} | null> {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
        where: { 
            id: Number(session?.user.id),
         },
    });
    return user;
}