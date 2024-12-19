"use client";

import { Button } from "@repo/ui/Button";
import { Card, CardContent, CardHeader } from "@repo/ui/CardTable";
import { Center } from "@repo/ui/Center";
import { useState } from "react";
import { P2P } from "../app/lib/actions/P2PTranfer";
import { Input } from "@repo/ui/Input";
import { Label } from "@repo/ui/Label";

export default function SendMoney() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleTransaction = async () => {
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
      <Center>
        <Card className="w-full max-w-lg">
          <CardHeader>
            <h1 className="text-2xl font-semibold">P2P Transfers</h1>
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
                  onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                  onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
      </Center>
    </div>
  );
}
