"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Loader, XIcon } from "lucide-react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createExpense } from "@/actions/create-expense";
import { toast } from "sonner";
import { ElementRef, useEffect, useRef, useState } from "react";
import { updateAllBalances } from "@/actions/update-all-balances";
import Image from "next/image";
import { Separator } from "../ui/separator";

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
    sideOffset = 16
} : FormPopoverProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);

    const [userExpenses, setUserExpenses] = useState<{ id: string; amount: string }[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [enteredAmount, setEnteredAmount] = useState<number>(0);

    const { execute, fieldErrors } = useAction(createExpense, {
        onSuccess: (data) => {
            toast.success("Expense added!");
            setUserExpenses([]);
            setTotalAmount(0);
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
            }
          } catch (error) {
            console.error('Error fetching group members:', error);
          }
        };
    
        fetchData();
      }, []);

      const handleUserExpenseChange = (userId: string, amount: string) => {
        setUserExpenses((prevUserExpenses) => {
          const userIndex = prevUserExpenses.findIndex((user) => user.id === userId);
      
          if (userIndex !== -1) {
            const newUserExpenses = [
              ...prevUserExpenses.slice(0, userIndex),
              { id: userId, amount },
              ...prevUserExpenses.slice(userIndex + 1),
          ];

          // Calculate total amount assigned to all users
          const newTotalAmount = newUserExpenses.reduce((total, userExpense) => total + parseFloat(userExpense.amount || "0"), 0);
          setTotalAmount(newTotalAmount);

          return newUserExpenses;
          } else {
            const newUserExpenses = [...prevUserExpenses, { id: userId, amount }];

                // Calculate total amount assigned to all users
                const newTotalAmount = newUserExpenses.reduce((total, userExpense) => total + parseFloat(userExpense.amount || "0"), 0);
                setTotalAmount(newTotalAmount);

                return newUserExpenses;
          }
        });
      };

    const {execute : executeUpdateAllBalances} = useAction(updateAllBalances);

    const onSubmit = (formData : FormData) => {
      const title = formData.get("title") as string;
      const amount = formData.get("amount") as string;
      execute({ title, amount, users: userExpenses });
      executeUpdateAllBalances({ users : userExpenses});
    }

    const handleEqualDistribution = () => {
      const formData = new FormData(document.querySelector('form') as HTMLFormElement);
      const amount = formData.get("amount") as string;
      const totalAmount = parseFloat(amount || "0");
      const numMembers = groupMembers.length;
  
      if (totalAmount > 0 && numMembers > 0) {
          const equalAmount = (totalAmount / numMembers).toFixed(2);
          setUserExpenses(groupMembers.map(member => ({ id: member.userId, amount: equalAmount })));
      }
      setTotalAmount(totalAmount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setEnteredAmount(parseInt(amount));
  };

  const resetForm = () => {
    setUserExpenses([]);
    setTotalAmount(0);
    setEnteredAmount(0);
};

    return(
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3 mr-2"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-6">
                    Create Expense
                </div>
                <PopoverClose asChild ref={closeRef} onClick={resetForm}>
                    <Button className="h-auto w-auto p-2 mr-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <XIcon className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <Separator className="mb-2"/>
                <form className="space-y-4" action={onSubmit}>
                    <div className="space-y-4">
                        <FormInput 
                            type="text"
                            label="Expense title"
                            id="title"
                            errors={fieldErrors}
                        />
                        <FormInput 
                            type="text"
                            label="Expense amount"
                            id="amount"
                            errors={fieldErrors}
                            onChange={handleAmountChange}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="text-neutral-700 font-medium text-sm">
                        Who borrowed, how much?
                      </p>
                        <Button 
                          variant="ghost"
                          className="ml-auto text-xs bg-neutral-200 p-2 h-7 text-black"
                          onClick={(e) => {
                            e.preventDefault(); 
                            handleEqualDistribution();
                        }}
                        >
                          Equally
                        </Button>
                    </div>
                    {groupMembers.map((member) =>(
                        <div key={member.id} className="flex">
                            <label className="flex w-full gap-2">
                              <Image 
                                src={member.imageUrl}
                                alt="Member Image"
                                height={16}
                                width={24}
                                className="object-cover rounded-full"
                              />
                              <p>
                                {member.userName}
                              </p>
                              <input
                                type="text"
                                value={(userExpenses.find(userExpense => userExpense.id === member.userId) || {}).amount || ""}
                                onChange={(e) => handleUserExpenseChange(member.userId, e.target.value)
                                } 
                                placeholder="₹"
                                className="border-b w-16 ml-auto text-center focus:border-none focus-visible:border-none"
                              />
                            </label>
                        </div>
                    ))}
                    <Separator className="mb-2"/>
                    {(enteredAmount - totalAmount) > 0 ? (
                          <p className="text-emerald-600 text-center">
                            {enteredAmount - totalAmount} ₹ left
                          </p>
                        ) : (enteredAmount - totalAmount) < 0 ? (
                          <p className="text-rose-600 text-center">
                            {Math.abs(enteredAmount - totalAmount)} ₹ over
                          </p>
                        ) : (
                          <FormSubmit className="w-full">
                            Create
                          </FormSubmit>
                        )}
                </form>
            </PopoverContent>
        </Popover>
    )
}