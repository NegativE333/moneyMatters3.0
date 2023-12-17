"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCardModal } from "@/hooks/use-modal";
import { fetcher } from "@/lib/fetcher";
import { Expense, ExpenseUser, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { UserDetails } from "./_components/user-details";
import { Header } from "./_components/header";

export const CardModal = () => {

    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    const { data : expenseData } = useQuery<Expense>({
        queryKey: ["expense", id],
        queryFn: () => fetcher(`/api/expense/${id}`)
    });

    const { data : expenseMembersData } = useQuery<ExpenseUser[]>({
        queryKey: ["expensemembers", id],
        queryFn: () => fetcher(`/api/expensemembers/${id}`)
    });

    const { data: usersData } = useQuery<User[]>({
        queryKey: ["users", expenseMembersData?.map((member) => member.userId)],
        queryFn: () => {
          const userIds = expenseMembersData
            ?.map((member) => member.userId)
            .filter(Boolean);
      
          if (!userIds || userIds.length === 0) {
            return Promise.resolve([]);
          }
      
          return fetcher(`/api/users/${userIds.join(",")}`);
        },
      });

      const userMapping = usersData?.reduce((acc, user) => {
        acc[user.userId] = user;
        return acc;
    }, {} as Record<string, User>);

    if(!expenseData || !usersData || !userMapping){
        return(
            <Header.Skeleton />
        )
    }
      
    return(
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <Header 
                    data={expenseData}
                />
                <Separator />
                <div className="hidden sm:flex">
                    <p className="w-[60%] truncate">
                        Involved Members in {expenseData?.title}
                    </p>
                    <p className="ml-auto">
                        Individual Shares
                    </p>
                </div>
                <div className="text-center sm:hidden text-zinc-600">
                    Detailed breakdown of <strong>{expenseData?.title}</strong> expense and individual shares.
                </div>
                {expenseMembersData?.map((expUser) => (
                    <UserDetails
                        key={expUser.id} 
                        imageUrl={userMapping?.[expUser.userId]?.imageUrl ?? '/'}
                        userName={userMapping?.[expUser.userId]?.userName}
                        amount={expUser?.amount}
                    />
                ))}
            </DialogContent>
        </Dialog>
    );
};