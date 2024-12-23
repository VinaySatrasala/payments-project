"use client";
import { PageHeader } from "@repo/ui/PageHeader";
import { Center } from "@repo/ui/Center";
import OnRampTransactions from "../../../components/on-ramp-transaction";

export default function page():JSX.Element {
  return (
    <div className="w-full">
      <div className="w-full p-10">
        <Center>
          <PageHeader title="Deposits" />
        </Center>
      </div>
      <div className="w-full">
        <Center>
          <div className="w-3/5">
            <OnRampTransactions />
          </div>
        </Center>
      </div>
    </div>
  );
};


