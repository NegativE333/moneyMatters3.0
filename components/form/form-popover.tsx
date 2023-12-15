"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createExpense } from "@/actions/create-expense";
import { toast } from "sonner";
import { ElementRef, useEffect, useRef, useState } from "react";
import { updateBalance } from "@/actions/update-balance";
import { auth, useOrganization, useOrganizationList } from "@clerk/nextjs";
import { useQuery } from '@tanstack/react-query';
import { Group } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";

interface FormPopoverProps{
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

interface GroupMember{
    id: string;
    userId: string;
    userName: string;
    imageUrl: string;
    groupId: string;
    balanceId: string;
}

export const FormPopover = ({
    children,
    side = "bottom",
    align,
    sideOffset = 0
} : FormPopoverProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);

    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [userExpenses, setUserExpenses] = useState<Record<string, string>>({});

    const { execute, fieldErrors } = useAction(createExpense, {
        onSuccess: (data) => {
            toast.success("Expense added!");
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/members');
            if (response.ok) {
              const data = await response.json();
              setGroupMembers(data);
            } else {
              console.error('Failed to fetch group members');
            }
          } catch (error) {
            console.error('Error fetching group members:', error);
          }
        };
    
        fetchData();
      }, []);

      const handleUserExpenseChange = (userId : string, amount : string) => {
        setUserExpenses((prevUserExpense) => ({
            ...prevUserExpense,
            [userId] : amount,
        }));
      };

      console.log(userExpenses);

    
    const {execute : executeUpdateBalance, fieldErrors : updateBalanceFieldError } = useAction(updateBalance);

    const onSubmit = (formData : FormData) => {
        const title = formData.get("title") as string;
        const amount = formData.get("amount") as string;
        execute({ title, amount });
        executeUpdateBalance({ amount });
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
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create Expense
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <XIcon className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <form className="space-y-4" action={onSubmit}>
                    <div className="space-y-4">
                        <FormInput 
                            type="text"
                            label="Expense title"
                            id="title"
                            errors={fieldErrors}
                        />
                        <FormInput 
                            type="number"
                            label="Expense amount"
                            id="amount"
                            errors={fieldErrors}
                        />
                    </div>
                    {groupMembers.map((member) =>(
                        <div key={member.id}>
                            <label>
              {member.userName} owes:
              <input
                type="number"
                value={userExpenses[member.userId] || ""}
                onChange={(e) =>
                  handleUserExpenseChange(member.userId, e.target.value)
                }
              />
            </label>
                        </div>
                    ))}
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}