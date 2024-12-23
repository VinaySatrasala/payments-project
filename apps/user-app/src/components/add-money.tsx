"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@repo/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/CardTable";
import { Input } from "@repo/ui/Input";
import { Label } from "@repo/ui/Label";
import { Select } from "@repo/ui/Select";
import { createOnRampTransaction } from "../app/lib/actions/create-on-ramp-transaction";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" }
];

function AddMoney(): JSX.Element {
  const [_redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [amount, setAmount] = useState(0);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p className="text-slate-500">Please log in to view transactions.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <Label>Amount</Label>
          <Input
            placeholder="Enter Amount"
            onchange={(e) => setAmount(Number(e.target.value))}
          />
          <div className="py-4 text-left pt-4 pb-2">Bank</div>
          <Select
            onSelect={(value) => {
              const selectedBank = SUPPORTED_BANKS.find(x => x.name === value);
              setRedirectUrl(selectedBank?.redirectUrl || "");
              setProvider(selectedBank?.name || "");
            }}
            options={SUPPORTED_BANKS.map(x => ({
              key: x.name,
              value: x.name
            }))}
          />
          <div className="flex justify-center pt-4">
            <Button
              onClick={async () => {
                if (amount > 0) {
                  await createOnRampTransaction(provider, amount);
                  // window.location.href = redirectUrl || "";
                }
              }}
              className="w-1/2 py-2 px-4 text-black"
            >
              Add Money
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddMoney;