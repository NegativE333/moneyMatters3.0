"use client";

import { ElementRef, useRef } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover"
import { XIcon } from "lucide-react";
import { FormInput } from "./form-input";
import { Separator } from "../ui/separator";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createReminder } from "@/actions/create-reminder";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface ReminderFormPopoverProps{
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const ReminderFormPopover = ({
    children,
    side,
    align,
    sideOffset
} : ReminderFormPopoverProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);

    const { execute , fieldErrors } = useAction(createReminder, {
        onSuccess: (data) => {
            toast.success("Reminder created!");
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error("Failed to create an reminder.");
        }
    });

    const resetForm = () => {

    };

    const onSubmit = (formData : FormData) => {
        const title = formData.get("title") as string;
        const desc = formData.get("desc") as string;
        console.log(title, desc);

        execute({ title, desc });
    }

    return(
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-6">
                    Create Reminder
                </div>
                <PopoverClose asChild ref={closeRef} onClick={resetForm}>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <XIcon className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <Separator />
                <form
                    action={onSubmit}
                >
                    <div className="space-y-4">
                        <FormInput 
                            type="text"
                            label="Reminder title"
                            id="title"
                            errors={fieldErrors}
                        />
                        <div className="space-y-1">
                            <Label htmlFor="desc" className="text-xs font-semibold text-neutral-700">
                                Reminder Description
                            </Label>
                            <Textarea id="desc" name="desc" className="border-black/30"/>
                        </div>
                        <Separator />
                        <FormSubmit className="w-full">
                            Create
                        </FormSubmit>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}