"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/fetcher";
import { useOrganization } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

interface TotalAmount {
    totalAmount : string;
}

export const InfoGroupBalance = () => {

    const { organization } = useOrganization();

    const { data : expenseData } = useQuery<TotalAmount>({
        queryKey: ["expense", organization?.id],
        queryFn: () => fetcher(`/api/balance/${organization?.id}`)
    });

    if(!expenseData){
        return(
            <div className="ml-auto">
                <Skeleton className="w-[130px] sm:w-[180px] h-[30px]"/>
            </div>
        )
    }

    return(
        <div 
            role="button"
                className="ml-auto flex items-center justify-center gap-2 p-2"
            >
                <p className="hidden sm:block text-md">
                        Total group expense : <span className="font-medium">{parseInt(expenseData?.totalAmount).toLocaleString("en-IN")} ₹ </span>
                </p>
                <div className="sm:hidden w-auto h-[20px] flex flex-col justify-center items-center gap-1">
                    <p className="text-sm">
                        Group total
                    </p>
                    <p className="font-medium">{parseInt(expenseData?.totalAmount).toLocaleString("en-IN")} ₹ </p>
                </div>
            </div>
    )
}

// InfoGroupBalance.Skeleton = function InfoGroupBalanceSkeleton() {
//     return(
//         <div className="ml-auto w-[100px]">
//             <Skeleton className="w-full h-[20px]"/>
//         </div>
//     )
// }