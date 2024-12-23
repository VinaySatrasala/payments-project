"use server"

import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";

export default async function getOnRampTransactions() : Promise<{ id: number; time: Date; amount: number; status: string; provider: string; }[]> {
    const session = await getServerSession(authOptions)
    if(!session || !session.user) {
        throw new Error("Unauthorized");
    }
    const txns = await prisma.onRampTransaction.findMany({
        where: { 
            userId : Number(session.user.id)
        },
    });
    return txns.map((t) => ({
        id : t.id,
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
}