import { Center } from "@repo/ui/Center";
import { PageHeader } from "@repo/ui/PageHeader";
import SendMoney from "../../../components/SendMoney";

export default function P2PTransfer():JSX.Element{
    return(
        <div className="w-full">
        <div className="w-full p-10">
          <Center>
            <PageHeader title="User Transfer" />
          </Center>
        </div>
        <div className="w-full">
          <Center>
            <div className="w-2/5   ">
              <SendMoney />
            </div>
          </Center>
        </div>
      </div>
    )
}