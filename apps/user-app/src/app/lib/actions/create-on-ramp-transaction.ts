"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function createOnRampTransaction( provider: string, amount: number): Promise<{ message: string, token?: string }> {
    const session = await getServerSession(authOptions);
    if(!session || !session.user?.id) {
        return {
            "message" : "unauthorized Request"
        }
    }

    const token = (Math.random() * 1000).toString();

    await prisma.onRampTransaction.create({
        data : {
            provider,
            status : "Processing",
            startTime : new Date(),
            token,
            userId : Number(session.user.id),
            amount
        }
    });


    return {
        "message" : "Done",
        "token":token
    }
}