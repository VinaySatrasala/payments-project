"use server"
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
export default async function getOnRampTransactions() {
    const session = await getServerSession(authOptions)

    const txns = await prisma.onRampTransaction.findMany({
        where: { 
            userId : Number(session?.user?.id)
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