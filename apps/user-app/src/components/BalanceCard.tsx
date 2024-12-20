"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/CardTable";
import { useEffect, useState } from "react";
import BalanceFetch from "../app/lib/actions/BalanceFetch";

export const BalanceCard = () => {
    const [balance, setBalance] = useState({ amount: 0, locked: 0 });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getBalance() {
            const res = await BalanceFetch();
            setBalance(res);
            setLoading(false);
        }
        getBalance();
    }, []);

    if(loading) {
        return (<Card>
            <CardHeader>
                <CardTitle>
                    Loading...
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    Loading...
                </div>
            </CardContent>
        </Card>)
    }
    return <Card>
        <CardHeader>
            <CardTitle>
                Balance
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between border-b border-slate-300 p-2">
                <div>
                    Unlocked balance
                </div>
                <div>
                    {balance.amount / 100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 p-2">
                <div>
                    Total Locked Balance
                </div>
                <div>
                    {balance.locked / 100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 p-2">
                <div>
                    Total Balance
                </div>
                <div>
                    {(balance.amount + balance.locked) / 100} INR
                </div>
            </div>
        </CardContent>
    </Card>
}