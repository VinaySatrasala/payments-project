import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import OnRampTransactions  from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


// Main TransferPage component
export default async function TransferPage() {
    const session = await getServerSession(authOptions);

    // If the user is not authenticated, return a redirect or show an error
    // @ts-ignore
    if (!session?.user?.id) {   
        return (
            <div>
                <p>You must be signed in to access this page.</p>
            </div>
        );
    }
    // @ts-ignore
    const userId = Number(session.user.id);

    return (

        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoney />
                </div>
                <div>
                    <div>
                        {/* <BalanceCard/> */}
                    </div>
                    <div className="pt-4">
                        <OnRampTransactions/>
                    </div>
                </div>
            </div>
        </div>
    );
}
