"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardContent } from "@repo/ui/CardTable";
import { Button } from "@repo/ui/Button";

export default function Page(): JSX.Element {
  const router = useRouter();
  const session = useSession();
  const currentHour = new Date().getHours();

  const getGreeting = () : string => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const greeting = getGreeting();

  return (
    <div className="container mx-auto p-6 bg-black text-white min-h-screen">
      <header className="mb-8 mt-8">
        <h1 className="text-4xl font-bold mb-4">
          {greeting} {session.data?.user.name},
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {/* Welcome Card */}
          <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-3xl font-bold">
              Welcome to <span className="text-green-500">Finly.</span>
            </p>
            <p className="text-lg text-gray-400 mt-4">
              Finly helps you manage your finances effortlessly. Whether you
              want to transfer funds, deposit to your wallet, or check your
              balance, you&apos;re in the right place. Start exploring the
              features below.
            </p>
          </Card>
          <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-3xl font-bold">
              Why choose <span className="text-green-500">Finly.</span>
            </p>
            <p className="text-lg text-gray-400 mt-4">
              At Finly, we prioritize your financial well-being. Our platform is
              built to deliver a secure, efficient, and user-friendly experience
              to help you stay in control of your money at all times.
            </p>
          </Card>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="w-full bg-gray-800 shadow-md rounded-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Peer-to-Peer Transfers</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Send money directly to other users quickly and securely.
            </p>
            <div className="flex gap-4">
              <Button
                className="w-full bg-white text-black p-3 hover:bg-blue-400"
                onClick={() => {
                  router.push("/transactions");
                }}
              >
                View Transfers
              </Button>
              <Button
                className="w-full bg-white text-black hover:bg-green-400"
                onClick={() => {
                  router.push("/P2Ptransfer");
                }}
              >
                Make a Transfer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-gray-800 shadow-md rounded-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Deposits to Wallet</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Add funds to your wallet for future transactions.
            </p>
            <div className="flex gap-4">
              <Button
                className="w-full bg-white text-black p-3 hover:bg-blue-400"
                onClick={() => {
                  router.push("/deposits");
                }}
              >
                View Deposits
              </Button>
              <Button
                className="w-full bg-white text-black p-3 hover:bg-green-400"
                onClick={() => {
                  router.push("/transfer");
                }}
              >
                Make a Deposit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-gray-800 shadow-md rounded-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">View Balance</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Check your current wallet balance and transaction history.
            </p>
            <div className="flex gap-4">
              <Button
                className="w-full bg-white text-black p-3 hover:bg-green-400"
                onClick={() => {
                  router.push("/balance");
                }}
              >
                View Balance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-12 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Finly. All rights reserved.</p>
      </footer>
    </div>
  );
}
