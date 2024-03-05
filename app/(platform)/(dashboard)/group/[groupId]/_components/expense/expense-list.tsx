
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { Welcome } from "../welcome/welcom";
import { ExpenseCard } from "./expense-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const ExpenseList = async ({
  searchParams = {}
} : {searchParams : {[key: string]: string | string[] | undefined}}) => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    return redirect("/select-org");
  }

  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 30;

  const skip = (page-1)*limit;
  
  const expenses = await db.expense.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit, // Limit the number of expenses
    skip: skip,
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
    return <Welcome userId={userId} />;
  }

  return ( 
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <Users className="h-6 w-6 mr-2" />
        Group Expenses
      </div>
      <ScrollArea className="h-[67vh] sm:h-[65vh] w-full rounded-md">
        <div className="flex flex-wrap justify-start items-start gap-3 w-full pr-3">
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
        <div className="flex justify-between mt-4 pb-2 sm:mb-4 mr-4">
          <Button asChild variant="outline" className={cn("mr-auto", page === 1 && "hidden")}>
                <Link
                  href={`/group/${orgId}?page=${page-1}`}
                >
                  <ChevronLeft className="h-4 w-4"/>
                  Previous
                </Link>
            </Button>
          <Button asChild variant="outline" className={cn("ml-auto", expenses.length < limit && 'hidden')}>
              <Link
                href={`/group/${orgId}?page=${page+1}`}
              >
                Next
                <ChevronRight className="h-4 w-4"/>
              </Link>
          </Button>
        </div>
      </ScrollArea>

    </div>
  );
};

ExpenseList.Skeleton = function ExpenseListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
      <Skeleton className="aspect-video h-16 w-full sm:w-[240px] p-2" />
      <Skeleton className="aspect-video h-16 w-full sm:w-[240px] p-2" />
      <Skeleton className="aspect-video h-16 w-full sm:w-[240px] p-2" />
      <Skeleton className="aspect-video h-16 w-full sm:w-[240px] p-2" />
      <Skeleton className="aspect-video h-16 w-full sm:w-[240px] p-2" />
      <Skeleton className="aspect-video h-16 w-full sm:w-[240px] p-2" />
      <Skeleton className="aspect-video h-16 w-full sm:w-[240px] p-2" />
      <Skeleton className="aspect-video h-16 w-full sm:w-[240px] p-2" />
    </div>
  );
};
