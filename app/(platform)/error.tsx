"use client";

import { Poppins } from "next/font/google";

const font = Poppins({ subsets : ['latin'], weight: ['400']});

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Error = () => {
    const router = useRouter();

    const onClick = () => {
        router.push('/');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return (  
        <div className={cn("h-full flex flex-col gap-4 items-center justify-center text-rose-500 px-2 md:px-60 text-center", font.className)}>
            <AlertCircle className="h-8 w-8"/>
            <h1 className="text-2xl font-semibold">
                Something went wrong!
            </h1>
            <p>
            Oops! Our piggy bank seems to have taken a break. We&apos;re on it, but in the meantime, why not head back to the home page and revisit your financial adventure?
            </p>
            <Button 
                variant="outline" 
                className="text-black"
                onClick={() => onClick()}
            >
                Go back to main page
            </Button>
        </div>
    );
}
 
export default Error;