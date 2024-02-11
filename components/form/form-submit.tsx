"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";

interface FormSubmitProps{
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    varient?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
    isProcessing?: boolean;
}

export const FormSubmit = ({
    children,
    disabled,
    className,
    varient = "primary",
    isProcessing
} : FormSubmitProps) => {
    const { pending } = useFormStatus();

    return(
        <Button
            disabled={pending || disabled}
            type="submit"
            className={cn(className)}
        >
            {pending ? (
                <>
                    <Loader2 className="animate-spin"/>
                </>
            ) : (
                <>  
                    {children}
                </>
            )}
        </Button>
    )
}