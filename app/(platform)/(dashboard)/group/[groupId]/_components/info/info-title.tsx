"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";

export const InfoTitle = () => {

    const { organization, isLoaded } = useOrganization();

    if(!isLoaded){
        return(
            <Skeleton className="w-24 h-6"/>
        )
    }

    return(
        <p className="font-semibold textt-xl">
            {organization?.name}
        </p>
    )
}