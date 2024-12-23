"use server"

import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";

export async function P2P(to : string, amount : number) : Promise<{message : string}>{
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        throw new Error("Unauthorized");
    }
    const from =  session.user.id;

    if(!from){
        return {
            "message" : "Error while sendind....No from user"
        }
    }

    const toUser = await prisma.user.findFirst({
        where : {
            number : to
        }
    });

    if(!toUser){
        return {
            message : "No to-user found Check the number"
        }
    }
    await prisma.$transaction(async (tx)=>{
        await tx.$executeRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where : {
                userId : Number(from)
            },
        });

        if(!fromBalance || fromBalance.amount < amount){
            throw new Error("Insuffucuent funds")
        }

        await tx.balance.update({
            where : {
                userId : Number(from)
            },
            data : {
                amount : {
                    decrement : amount
                }
            },
        });

        await tx.balance.update({
            where : {
                userId : Number(toUser.id)
            },
            data : {
                amount : {
                    increment : amount
                }
            }
        })

        await tx.p2pTransfer.create({
            data : {
                amount,
                timestamp : new Date(),
                fromUserId : Number(from),
                toUserId : Number(toUser.id), 
            }
        })
    })

    return {
        "message" : "Transaction Succesful..!"
    }
}