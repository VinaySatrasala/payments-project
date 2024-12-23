'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/CardTable";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@repo/ui/Table";
import getOnRampTransactions from "../app/lib/actions/on-ramp-transactions";

export default function OnRampTransactions(): JSX.Element {
  const [transactions, setTransactions] = useState<{ id: number; time: Date; amount: number; status: string; provider: string; }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect((): void => {
    const fetchTransactions = async (): Promise<void> => {
      try {
        const data = await getOnRampTransactions();
        setTransactions(data);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center">Loading...</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id.toString()}>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
                      ${transaction.status === 'Success' ? 'bg-green-500/20 text-green-500' : ''} 
                      ${transaction.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-500' : ''} 
                      ${transaction.status === 'Failed' ? 'bg-red-500/20 text-red-500' : ''}`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell>{transaction.provider}</TableCell>
                <TableCell>{new Date(transaction.time).toDateString()}</TableCell>
                <TableCell className="text-right">{transaction.amount.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
