import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/CardTable"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@repo/ui/Table"

type Transaction = {
  id: number
  status: 'Success' | 'Processing' | 'Failed'
  customer: string
  date: string
  amount: string
}

const transactions: Transaction[] = [
  { id: 1, status: "Success", customer: "Emma Watson", date: "2023-06-25", amount: "$542.00" },
  { id: 2, status: "Processing", customer: "Liam Neeson", date: "2023-06-24", amount: "$189.50" },
  { id: 3, status: "Failed", customer: "Scarlett Johansson", date: "2023-06-23", amount: "$896.00" },
  { id: 4, status: "Success", customer: "Chris Hemsworth", date: "2023-06-22", amount: "$328.75" },
  { id: 5, status: "Processing", customer: "Natalie Portman", date: "2023-06-21", amount: "$1,247.00" },
]

export default function OnRampTransactions(): React.ReactElement {
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
              <TableRow key={transaction.id}>
                <TableCell>
                  <span 
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Success' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{transaction.customer}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className="text-right">{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

