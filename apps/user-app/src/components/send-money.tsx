'use client';

import { useState } from "react";
import { Button } from "@repo/ui/Button";
import { Card, CardContent, CardHeader } from "@repo/ui/CardTable";
import { Center } from "@repo/ui/Center";
import { Input } from "@repo/ui/Input";
import { Label } from "@repo/ui/Label";
import { P2P } from "../app/lib/actions/p2p-transfer";

export default function SendMoney(): JSX.Element {
  const [number, setNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleTransaction = async (): Promise<void> => {
    setLoading(true);
    setPopupMessage(null); // Clear any existing messages
    try {
      const res = await P2P(number, Number(amount) * 100);
      setPopupMessage(res.message); // Set success or failure message
    } catch (error) {
      setPopupMessage("An error occurred during the transaction.");
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <div className="h-full p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Enter User Details</h1>
        </CardHeader>
        <CardContent>
          <div className="pt-2 space-y-6">
            {/* Number Input */}
            <div>
              <Label>
                <span className="text-lg font-medium">Number</span>
              </Label>
              <Input
                placeholder="Enter recipient's number"
                className="mt-2 h-12 text-base text-lg"
                onchange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setNumber(e.target.value);
                }}
              />
            </div>

            {/* Amount Input */}
            <div>
              <Label>
                <span className="text-lg font-medium">Amount</span>
              </Label>
              <Input
                placeholder="Enter amount"
                className="mt-2 h-12 text-lg"
                onchange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setAmount(e.target.value);
                }}
              />
            </div>

            {/* Submit Button */}
            <Center>
              <Button
                className="w-1/2 py-2 px-2 text-black text-lg"
                onClick={handleTransaction}
              >
                {loading ? "Processing..." : "Send"}
              </Button>
            </Center>

            {/* Popup Message */}
            {popupMessage && (
              <div className="mt-4 p-4 bg-gray-800 text-white rounded shadow-lg">
                <p>{popupMessage}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
