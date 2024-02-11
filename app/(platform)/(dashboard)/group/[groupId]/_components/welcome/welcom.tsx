"use client";

import { createExpense } from "@/actions/create-expense";
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({subsets: ['latin'], weight: ['500']});

interface WelcomeProps{
    groupName : string;
    userId: string
}

export const Welcome = ({
    groupName,
    userId
} : WelcomeProps) => {
    
    const [isLoading, setIsLoading] = useState(false);

    const { organization, isLoaded } = useOrganization();

    const {execute} = useAction(createExpense, {
        onSuccess: (data) => {
            toast.success("Successfully joined!");
        }
    });

    const onSubmit = () => {
        setIsLoading(true);
        execute({ title:'welcomeExpenseUnique', amount:'0', users:[{id: userId, amount: "0"}]});
    }

    return(
        // <div className="flex items-center justify-center h-96">
        //         <div className="h-auto border border-zinc-900 rounded-md text-black flex flex-col items-center justify-center text-center p-4 gap-2">
        //             <p className="text-lg font-medium">
        //                 Welcome to {groupName?.charAt(0).toUpperCase() + groupName?.slice(1)}
        //             </p>
        //             <p>
        //                 Ready to kickstart your financial journey?
        //             </p>
        //             {isLoading ? (
        //                 <div>
        //                     Loading...
        //                 </div>
        //             ) : (
        //                 <Button 
        //                     variant="ghost"
        //                     onClick={onSubmit}
        //                 >
        //                     Click here to start
        //                 </Button>
        //             )}
        //         </div>
        //     </div>
        <div className={cn("h-96 flex flex-col justify-center items-center", isLoading ? 'gap-8' : 'gap-4')}>
            <Image 
                height={200}
                width={200}
                src='/logo.svg'
                alt="Organization"
                className={cn("rounded-md object-cover", isLoading && 'animate-spin duration-3000')}
            />
            <h2 className={cn("text-md text-muted-foreground font-semibold text-center", font.className)}>
                {isLoading ? (
                    <>
                        Almost there! You&apos;re about to be part of the finance squad.
                    </>
                ) : (
                    <>
                        Ready to kickstart your financial journey?
                    </>
                )}
            </h2>
            <div className={cn("flex", isLoading && 'hidden')}>
                <Button variant="outline" onClick={onSubmit}>
                    Click here to start
                </Button>
            </div>
        </div>
    )
}