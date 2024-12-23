"use client";
import { PageHeader } from "@repo/ui/PageHeader";
import { Center } from "@repo/ui/Center";
import AddMoney  from "../../../components/add-money";

// Main TransferPage component
export default function TransferPage() : JSX.Element {
  return (
    <div className="w-full">
      <div className="w-full p-10">
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
