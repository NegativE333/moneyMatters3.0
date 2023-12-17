import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info/info";
import { ExpenseList } from "./_components/expense/expense-list";
import { Suspense } from "react";

const OrganizationIdPage = async () => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<ExpenseList.Skeleton />}>
          <ExpenseList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
