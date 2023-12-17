"use client";

import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { generateIcon } from "@/lib/generate-icon";
import { Expense } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ElementRef, useRef, useState } from "react";

interface HeaderProps{
    data: Expense;
}

export const Header = ({
    data
} : HeaderProps) => {

    const [title, setTitle] = useState(data.title);
    const queryClient = useQueryClient();
    const inputRef = useRef<ElementRef<"input">>(null);
    const onBlur = () => {
        inputRef.current?.form?.requestSubmit();
    }

    const onSubmit = (formData : FormData) => {
        
    }

    return(
        <div className="flex flex-col">            
            <div className="flex items-start gap-x-3 mb-2 w-full">
                {generateIcon(data.title.toLowerCase(), "h-5 w-5 mt-1 text-neutral-700")}
                    <p className="w-[90%] font-semibold text-xl text-neutral-700 truncate">
                        {title}
                    </p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">
                    Added by <b>{data?.addedBy}</b> on <b>{format(new Date(data?.createdAt), "MMM d, yyyy")}</b>
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