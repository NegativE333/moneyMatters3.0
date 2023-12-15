"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormSubmitProps{
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    varient?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
}

export const FormSubmit = ({
    children,
    disabled,
    className,
    varient = "primary"
} : FormSubmitProps) => {
    const { pending } = useFormStatus();

    return(
        <Button
            disabled={pending || disabled}
            type="submit"
            variant={varient}
            className={cn(className)}
        >
            {children}
        </Button>
    )
}