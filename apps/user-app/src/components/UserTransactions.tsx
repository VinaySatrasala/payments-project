"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@repo/ui/CardTable";
import { Center } from "@repo/ui/Center";
import { useSession } from "next-auth/react";
import P2P from "@repo/ui/P2P";

interface Transaction {
  id: number;
  fromUserId: number;
  toUserId: number;
  amount: number;
  timestamp: Date;
}

interface UserTransactionsProps {
  transactions: Transaction[];
}

  
  
export default function UserTransactions({ transactions }: UserTransactionsProps) {
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
      <Card title="Transactions">
        <p className="text-slate-500">No transactions found.</p>
      </Card>
    );
  }

  return (
    <Center>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <h1 className="text-2xl font-bold">P2P Transactions</h1>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {transactions.map((transaction) => {
              // @ts-ignore
              const isReceived = transaction.toUserId === Number(session.user?.id);
              return (
                <li key={transaction.id}>
                  <Card>
                    <P2P
                      icon={isReceived ? <Received /> : <Sent />}
                      type={isReceived ? "Received" : "Sent"}
                      id={isReceived
                        ? `From User: ${transaction.fromUserId}`
                        : `To User: ${transaction.toUserId}`}
                      amount={`₹ ${(transaction.amount / 100).toFixed(2)}`}
                      date={transaction.timestamp.toLocaleDateString() + " " + transaction.timestamp.toLocaleTimeString()+" IST"}

                    />
                  </Card>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </Center>
  );
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function Received(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
    </svg>
  );
}

function Sent(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );
}


