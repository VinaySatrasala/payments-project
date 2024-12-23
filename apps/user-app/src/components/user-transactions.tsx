"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@repo/ui/CardTable";
import { Center } from "@repo/ui/Center";
import P2P from "@repo/ui/P2P";
import getP2PTransactions from "../app/lib/actions/p2p-transactions";

interface Transaction {
  id: number;
  fromUserId: number;
  toUserId: number;
  amount: number;
  timestamp: Date;
}

export default function UserTransactions(): JSX.Element {
  const { data: session, status } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect((): void => {
    async function fetchTransactions() {
      try {
        const fetchedTransactions: Transaction[] = await getP2PTransactions();
        const transformedTransactions = fetchedTransactions.map((tx) => ({
          ...tx,
          timestamp: new Date(tx.timestamp), // Ensure timestamp is a Date object
        }));
        setTransactions(transformedTransactions);
      } catch (error) {
        // Handle error properly (you can show an error UI instead of console.log in production)
        alert("Failed to fetch transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions().catch((error) => {
      // Catch any unhandled promise rejections
      console.error("Error during transaction fetch:", error);
      setLoading(false);
    });
  }, []);

  if (status === "loading" || loading) {
    return (
      <Center>
        <p>Loading...</p>
      </Center>
    );
  }

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold">Transactions</h1>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Please log in to view transactions.</p>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold">Transactions</h1>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">No transactions found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <ul className="space-y-4">
        {transactions.map((transaction) => {
          const isReceived = transaction.toUserId === Number(session.user?.id);
          return (
            <li key={transaction.id}>
              <Card className="bg-gray-900 text-white">
                <P2P
                  icon={isReceived ? <Received /> : <Sent />}
                  type={isReceived ? "Received" : "Sent"}
                  id={
                    isReceived
                      ? `From User: ${transaction.fromUserId}`
                      : `To User: ${transaction.toUserId}`
                  }
                  amount={`₹ ${(transaction.amount / 100).toFixed(2)}`}
                  date={formatDate(transaction.timestamp)}
                />
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function formatDate(timestamp: Date): string {
  return timestamp.toLocaleString("en-US", {
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
      className="w-8 h-8 text-green-500"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
      />
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
      className="w-9 h-9 text-red-500"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}
