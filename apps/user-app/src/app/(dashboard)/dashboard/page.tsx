"use client"

import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardContent } from '@repo/ui/CardTable'
import { Button } from '@repo/ui/Button'

export default function Page(): JSX.Element {
  const router = useRouter()

  const features = [
    {
      title: "Peer-to-Peer Transfers",
      description: "Send money directly to other users quickly and securely.",
      path: "/peer-transfer"
    },
    {
      title: "Deposits to Wallet",
      description: "Add funds to your wallet for future transactions.",
      path: "/deposit"
    },
    {
      title: "View Balance",
      description: "Check your current wallet balance and transaction history.",
      path: "/balance"
    }
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Financial App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <h2 className="text-xl font-semibold">{feature.title}</h2>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{feature.description}</p>
              <Button 
                onClick={() => router.push(feature.path)}
                className="w-full text-black p-3"
              >
                Go to {feature.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

