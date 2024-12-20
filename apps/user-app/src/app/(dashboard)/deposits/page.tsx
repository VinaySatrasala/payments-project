"use client";
import OnRampTransactions from "../../../components/OnRampTransaction";
import { Center } from "@repo/ui/Center";

export default function page():JSX.Element {
  return (
    <div className="w-full">
      <Center>
        <OnRampTransactions />
      </Center>
    </div>
  );
};


