"use client";
import { Center } from "@repo/ui/Center";
import UserTransactions from "../../../components/UserTransactions";
import { PageHeader } from "@repo/ui/PageHeader";

export default function P2PTransactionsPage() {
  return (
    <div className="w-full">
      <div className="w-full p-10">
        <Center>
          <PageHeader title="Peer To Peer Transactions" />
        </Center>
      </div>
      <div>
        <Center>
          <div className="w-1/2">
            <UserTransactions/>
          </div>
        </Center>
      </div>
    </div>
  );
}
