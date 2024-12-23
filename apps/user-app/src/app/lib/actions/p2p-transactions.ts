"use server"
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";

interface incomingType {
    id: number;
    fromUserId: number;
    toUserId: number;
    amount: number;
    timestamp: Date; // Updated to Date
  }

export default async function getP2PTransactions() : Promise<incomingType[]> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("User is not authenticated");
    }

    const userId = Number(session.user.id);
    const res = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: userId },
                { toUserId: userId }
            ]
        },
        orderBy: {
            timestamp: 'asc' // Sort directly in the database
        }
    });
    return res;
}