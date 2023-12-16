"use client";

import { createExpense } from "@/actions/create-expense";
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface WelcomeProps{
    groupName : string;
    userId: string
}

export const Welcome = ({
    groupName,
    userId
} : WelcomeProps) => {

    const {execute} = useAction(createExpense, {
        onSuccess: (data) => {
            toast.success("Successfully joined!");
        }
    });

    const onSubmit = () => {
        execute({ title:'welcomeExpenseUnique', amount:'0', users:[{id: userId, amount: "0"}]});
    }

    return(
        <div className="flex items-center justify-center h-96">
                <div className="h-auto border border-zinc-900 rounded-md text-black flex flex-col items-center justify-center text-center p-4 gap-2">
                    <p className="text-lg font-medium">
                        Welcome to {groupName?.charAt(0).toUpperCase() + groupName?.slice(1)}
                    </p>
                    <p>
                        Ready to kickstart your financial journey?
                    </p>
                    <Button 
                        variant="ghost"
                        onClick={onSubmit}
                    >
                        Click here to start
                    </Button>
                </div>
            </div>
    )
}