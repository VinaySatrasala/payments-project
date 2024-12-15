"use client";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { useSession } from "next-auth/react";

export default function UserTransactions({ transactions }: { transactions: any[] }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <Center>
                <p>Loading...</p>
            </Center>
        );
    }

    if (!session) {
        return (
            <Center>
                <p className="text-slate-500">Please log in to view transactions.</p>
            </Center>
        );
    }

    if (!transactions || transactions.length === 0) {
        return (
            <Card title={"Transactions"}>
                <p className="text-slate-500">No transactions found.</p>
            </Card>
        );
    }

    return (
        <Center>
            <Card title={"Transactions"}>
                <div className="">
                    {transactions.map((transaction: any) => {
                        // @ts-ignore
                        const isReceived = transaction.toUserId === Number(session.user?.id);
                        return (
                            <div
                                key={transaction.id}
                                className="p-6 border mt-2 rounded-xl w-full max-w-3xl mx-auto mt-4"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-lg">
                                        {isReceived ? "Received" : "Sent"}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {new Date(transaction.timestamp).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        })}
                                    </p>
                                </div>
                                <p className="text-xl font-medium my-2">
                                    Amount: ₹{transaction.amount / 100}
                                </p>
                                <p className="text-sm text-gray-700">
                                    {isReceived
                                        ? `From User: ${transaction.fromUserId}`
                                        : `To User: ${transaction.toUserId}`}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </Center>
    );
}
