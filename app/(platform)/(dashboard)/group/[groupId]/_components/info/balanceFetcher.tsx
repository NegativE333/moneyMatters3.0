import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { Users, Wallet } from "lucide-react";

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

    const group = await db.group.findFirst({
        where:{
            group: orgId
        }
    });

    let userCount;

    if(group){
        userCount = await db.user.count({
            where:{
                groupId: group?.id
            }
        });
    }


    let Icon;

    if(balance === null || parseFloat(balance.balance) === 0){
        Icon = <Wallet className="h-[18px] w-[18px] mr-1 text-black"/>
    }
    else if(parseInt(balance.balance) > 0){
        Icon = <Wallet className="h-[18px] w-[18px] mr-1 text-emerald-500"/>
    }
    else{
        Icon = <Wallet className="h-[18px] w-[18px] mr-1 text-rose-500"/>
    }

    const formatedBalance = parseFloat(balance?.balance || "0").toFixed(2);

    return(
        <div className="flex flex-wrap items-center text-[12px] sm:text-sm text-muted-foreground">
            { Icon }
            <div className="text-black font-semibold w-auto">
                {formatedBalance} ₹
            </div>
            <Separator orientation="vertical" className="mx-3 h-4 bg-black"/>
            <Users className="h-3 w-3 mr-1 text-black/90"/>
            <span className="font-medium text-black/90">
                {userCount ? userCount : '0'} 
            </span>
        </div>
    )
}