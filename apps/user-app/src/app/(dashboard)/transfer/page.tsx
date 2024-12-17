import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import OnRampTransactions  from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

// Fetch the user's balance
async function getBalance(userId: number) {
    const balance = await prisma.balance.findFirst({
        where: { userId },
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0,
    };
}

// Fetch the user's on-ramp transactions
async function getOnRampTransactions(userId: number) {
    const txns = await prisma.onRampTransaction.findMany({
        where: { userId },
    });
    return txns.map((t) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
}

// Main TransferPage component
export default async function TransferPage() {
    const session = await getServerSession(authOptions);

    // If the user is not authenticated, return a redirect or show an error
    if (!session?.user?.id) {   
        return (
            <div>
                <p>You must be signed in to access this page.</p>
            </div>
        );
    }

    const userId = Number(session.user.id);

    // Fetch balance and transactions data
    const balance = await getBalance(userId);
    const transactions = await getOnRampTransactions(userId);

    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoney />
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        <OnRampTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
