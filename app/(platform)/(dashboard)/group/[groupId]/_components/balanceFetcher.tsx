import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { Wallet } from "lucide-react";

export const BalanceFetcher = async () => {
    const { userId, orgId } = auth();

    if(!userId || !orgId){
        return null;
    }
    
    const balance = await db.balance.findFirst({
        where:{
            userId,
            orgId
        }
    });

    let Icon;

    if(balance === null){
        Icon = <Wallet className="h-[18px] w-[18px] mr-1 text-black"/>
    }
    else if(parseInt(balance.balance) > 0){
        Icon = <Wallet className="h-[18px] w-[18px] mr-1 text-emerald-500"/>
    }
    else{
        Icon = <Wallet className="h-[18px] w-[18px] mr-1 text-rose-500"/>
    }

    return(
        <div className="flex items-center text-sm text-muted-foreground">
            { Icon }
            <div className="text-black font-semibold">
                {balance?.balance} ₹
            </div>
        </div>
    )
}