"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function createOnRampTransaction( provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if(!session?.user || !session.user?.id){
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
            token : token,
            // @ts-ignore
            userId : Number(session?.user?.id),
            amount : amount
        }
    });

    return {
        "message" : "Done"
    }
}