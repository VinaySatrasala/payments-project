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
  id:Number
  time : Date
  status: any
  provider:string
  amount: Number
}



export default function OnRampTransactions({transactions}:{transactions:Transaction[]}): React.ReactElement {
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
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Success' ? 'bg-green-500/20 text-green-500' :
                      transaction.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell className="font-2xl">{transaction.provider}</TableCell>
                <TableCell>{transaction.time.toDateString()}</TableCell>
                <TableCell className="text-right">{transaction.amount.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

