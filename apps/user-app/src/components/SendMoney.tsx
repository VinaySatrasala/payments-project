"use client"
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { Center } from "@repo/ui/Center"
import { useState } from "react";
import P2P from "../app/lib/actions/P2PTranfer";

export default function SendMoney() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="h-full">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            console.log("send")
                            await P2P(number,Number(amount)*100);
                            console.log("rec")
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}