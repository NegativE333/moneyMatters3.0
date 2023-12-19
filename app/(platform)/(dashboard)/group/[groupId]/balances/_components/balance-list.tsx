import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs";
import { Wallet } from "lucide-react"
import Image from "next/image";

export const BalanceList = async () => {

    const { orgId } = auth();

    if(!orgId){
        return null;
    }

    const balances = await db.balance.findMany({
        where:{
            orgId: orgId
        },
        include:{
            users: {
                select: {
                    userId: true,
                    userName: true,
                    imageUrl: true
                }
            }
        }
    });

    if(!balances){
        return null;
    }

    return(
        <div className="px-2 md:px-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <Wallet className="h-6 w-6 mr-2" />
                Balances
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {balances.map((balance) =>( 
                    <div key={balance.id}>
                        {balance.users.map((user) => (
                            <div key={user.userId} className="flex gap-2 min-w-[300px] max-w-[320px] items-center border border-black/30 rounded-sm">
                                <Image 
                                    src={user.imageUrl ?? "/"}
                                    alt="img"
                                    height={40}
                                    width={40}
                                    className="rounded-s-sm"
                                />
                                <p className="w-[50%] truncate font-medium">
                                    {user.userName}
                                </p>
                                <p className={`ml-auto pr-2 ${parseFloat(balances.find((b) => b.userId === user.userId)?.balance ?? "0") > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                                    {parseFloat(balances.find((b) => b.userId === user.userId)?.balance ?? "0").toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 2,
                                    })} ₹
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}