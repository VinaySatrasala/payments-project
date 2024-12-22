import { Center } from "@repo/ui/Center";
import { BalanceCard } from "../../../components/BalanceCard";
import { PageHeader } from "@repo/ui/PageHeader";

export default function page() {
  return (
    <div className="w-full">
      <div className="w-full p-10">
        <Center>
          <PageHeader title="Balance" />
        </Center>
      </div>
      <div className="w-full">
        <Center>
          <div className="w-96">
            <BalanceCard />
          </div>
        </Center>
      </div>
    </div>
  );
}
