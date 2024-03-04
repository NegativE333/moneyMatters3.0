"use client";

import { ReminderFormPopover } from "@/components/form/reminder-form-popover";
import { Plus } from "lucide-react"

export const InfoAddReminder = () => {

    return(
        <ReminderFormPopover side="bottom" sideOffset={10}>
            <div 
                role="button"
                className="ml-auto flex items-center justify-center gap-2 p-2 border border-black/50 hover:border-black rounded-md"
            >
                <Plus className="h-4 w-4"/>
                <p className="hidden sm:block text-sm">
                        Add a reminder
                </p>
            </div>
        </ReminderFormPopover>
    )
}