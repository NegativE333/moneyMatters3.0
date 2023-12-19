"use client";

import { useOrganization } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { InfoAddExpense } from "./info-add-expense";
import { InfoGroupBalance } from "./info-group-balance";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoAddReminder } from "./info-add-reminder";

export const Option = () => {
    const pathName = usePathname();
    const parts = pathName.split('/');
    const lastPart = parts[parts.length - 1];

    const {organization, isLoaded} = useOrganization();

    if(!isLoaded || !organization){
        return(
            <div className="ml-auto w-[130px] sm:w-[180px] h-[30px]">
                <Skeleton className="h-full w-full"/>
            </div>
        )
    }
    console.log(organization?.id);

    if(lastPart === organization.id){
        return <InfoAddExpense />;
    }
    else if(lastPart === "activity"){
        return null;
    }
    else if(lastPart === "balances"){
        return <InfoGroupBalance />
    }
    else if(lastPart === "reminders"){
        return <InfoAddReminder />
    }

    return(
        <div>
            Something
        </div>
    )
}