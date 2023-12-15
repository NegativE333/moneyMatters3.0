"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

export const InfoImage = () => {

    const { organization, isLoaded } = useOrganization();

    if(!isLoaded){
        return(
            <Skeleton className="w-[60px] h-[60px]"/>
        )
    }

    return(
        <div className="w-[60px] h-[60px] relative">
                <Image 
                    fill
                    src={organization?.imageUrl!}
                    alt="Organization"
                    className="rounded-md object-cover"
                />
            </div>
    )
}