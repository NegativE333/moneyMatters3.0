import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Users } from "lucide-react";
import { redirect } from "next/navigation";
import { Welcome } from "../welcome/welcom";
import { ExpenseCard } from "./expense-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ExpenseList = async () => {
  const { orgId, userId, orgSlug } = auth();

  if (!orgId || !userId || !orgSlug) {
    return redirect("/select-org");
  }

  const PAGE_SIZE = 30;

  const expenses = await db.expense.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE, // Limit the number of expenses
    skip: 0, 
  });

  const groupID = await db.group.findFirst({
    where: {
      group: orgId,
    },
  });

  const newUser = await db.user.findFirst({
    where: {
      userId: userId,
      groupId: groupID?.id,
    },
  });

  if (!newUser || !groupID) {
    return <Welcome groupName={orgSlug} userId={userId} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <Users className="h-6 w-6 mr-2" />
        Group Expenses
      </div>
      <ScrollArea className="h-[480px] sm:h-[430px] w-full rounded-md border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
          {expenses.map((exp) => (
            <ExpenseCard 
              key={exp.id}
              id={exp.id}
              title={exp.title}
              addedBy={exp.addedBy}
              amount={exp.amount}
              createdAt={exp.createdAt}
            />
          ))}
        </div>
      </ScrollArea>

    </div>
  );
};

ExpenseList.Skeleton = function ExpenseListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
