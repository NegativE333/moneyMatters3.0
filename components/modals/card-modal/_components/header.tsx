"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { generateIcon } from "@/lib/generate-icon";
import { Expense } from "@prisma/client";
import { format } from "date-fns";

interface HeaderProps{
    data: Expense;
    currUserId?: string;
}

export const Header = ({
    data,
    currUserId
} : HeaderProps) => {

    return(
        <div className="flex flex-col">            
            <div className="flex items-start gap-x-3 mb-2 w-[95%]">
                {generateIcon(data.title.toLowerCase(), "h-5 w-5 mt-1 text-neutral-700")}
                    <p className="w-[60%] font-semibold text-xl text-neutral-700 truncate">
                        {data.title}
                    </p>
            </div>
            <div>
                <p className="text-center sm:text-start text-xs text-muted-foreground">
                    Added by 
                    {data.userId === currUserId ? (
                        <b> You </b> 
                    ) : (
                        <b> {data?.addedBy} </b>
                    )}
                    on <b>{format(new Date(data?.createdAt), "MMM d, yyyy")}</b> at {format(new Date(data?.createdAt), "hh:mm a")}
                </p>
            </div>
        </div>
    )
}

Header.Skeleton = function HeaderSkeleton() {
    return(
        <div className="flex flex-col">
            <Skeleton className="h-6 w-6 bg-neutral-200"/>
            <div>
                <Skeleton className="h-6 w-24 mb-1 border-e-neutral-200" />
                <Skeleton className="h-4 w-12 border-e-neutral-200" />
            </div>
        </div>
    )
}