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

    const {execute} = useAction(createExpense, {
        onSuccess: (data) => {
            toast.success("Successfully joined!");
        }
    });

    const onSubmit = () => {
        setIsLoading(true);
        execute({ title:'welcomeExpenseUnique', amount:'0', users:[{id: userId, amount: "0"}]});
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    }

    return(
        <div className={cn("h-96 flex flex-col justify-center items-center", isLoading ? 'gap-8' : 'gap-4')}>
            <Image 
                height={200}
                width={200}
                src='/logo.svg'
                alt="Organization"
                className={cn("rounded-md object-cover", isLoading && 'animate-spin duration-3000')}
            />
            <h2 className={cn("text-sm sm:text-[16px] text-muted-foreground font-semibold text-center", font.className)}>
                {isLoading ? (
                    <div className="flex flex-col gap-2">
                        <p>
                            Get ready! We&apos;re setting up your account for this group. Hang tight while we reload the page.
                        </p>
                    </div>
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