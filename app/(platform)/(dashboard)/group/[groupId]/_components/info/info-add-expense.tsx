"use client";

import { FormPopover } from "@/components/form/form-popover"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react";


export const InfoAddExpense = () => {

    const [hide, setHide] = useState(true);

    useEffect(() => {
        const res = async () => {
            const response = await fetch('/api/members');
            if(response.ok){
                setHide(false);
            }
        }
        res();
    });

    if(hide){
        return null;
    }

    return(
        <FormPopover side="bottom" sideOffset={10}>
            <div 
                role="button"
                className="ml-auto flex items-center justify-center gap-2 p-2 border border-black/50 hover:border-black rounded-md mr-1"
            >
                <Plus className="h-4 w-4"/>
                <p className="hidden sm:block text-sm">
                        Add new expense
                </p>
            </div>
        </FormPopover>
    )
}