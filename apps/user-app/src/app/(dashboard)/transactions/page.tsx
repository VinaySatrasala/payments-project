import { getServerSession } from "next-auth";
import UserTransactions from "../../../components/UserTransactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error("User is not authenticated");
    }
    // @ts-ignore
    const userId = Number(session.user?.id);

    // Fetch all transactions where the user is either the sender or the receiver
    return await prisma.p2pTransfer.findMany({
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
}

export default async function P2PTransactionsPage() {
    const transactions = await getP2PTransactions();

    return (
        <div className="w-full">
            <UserTransactions transactions={transactions} />
        </div>
    );
}
