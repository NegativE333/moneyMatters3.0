"use client";

import { useOrganization } from "@clerk/nextjs";
import { Users } from "lucide-react";

export const InfoMemberCount = () => {

    const { organization } = useOrganization();
    
    return(
        <div className="flex items-center justify-center">
            <Users className="h-[14px] w-[14px] mr-1 text-black/90"/>
            <span className="font-medium text-black/90 text-[14px]">
                {organization?.membersCount} 
            </span>
        </div>
    )
}

