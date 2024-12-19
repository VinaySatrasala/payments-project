"use client"
import { Button } from "@repo/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/CardTable";
import { Select } from "@repo/ui/Select";
import { ChangeEvent, useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/CreateOnRampTransaction";
import { Label } from "@repo/ui/Label";
import { Input } from "@repo/ui/Input";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    return <Card>
        <CardHeader>
            <CardTitle>
                Add Money
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="w-full">
                <Label>Amount</Label>
                <Input
                    placeholder="Enter Amount" 
                    onchange={(e:any) => {
                    console.log(e.target.value)
                    setValue(Number(e.target.value))
                }}></Input>
                <div className="py-4 text-left pt-4 pb-2">
                    Bank
                </div>
                <Select onSelect={(value) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />
                <div className="flex justify-center pt-4">
                    <Button onClick={async () => {
                        console.log(value)
                        
                        await createOnRampTransaction(provider, value)
                        // window.location.href = redirectUrl || "";
                    }} className="w-1/2 py-2 px-4 text-black">
                        Add Money
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
}