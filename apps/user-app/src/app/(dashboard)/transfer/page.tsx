"use client";
import { PageHeader } from "@repo/ui/PageHeader";
import { AddMoney } from "../../../components/AddMoney";
import { Center } from "@repo/ui/Center";

// Main TransferPage component
export default async function TransferPage() {
  return (
    <div className="w-full">
      <div className="w-full p-10;">
        <Center>
          <PageHeader title="TopUp Wallet" />
        </Center>
      </div>
      <div className="w-full h-3/5">
        <Center>
          <div className="w-96">
            <AddMoney />
          </div>
        </Center>
      </div>
    </div>
  );
}
