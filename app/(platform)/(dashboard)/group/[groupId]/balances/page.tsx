import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info/info";
import { BalanceList } from "./_components/balance-list";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { startOfMonth, endOfMonth } from "date-fns";
import { PercentDiamond } from "lucide-react";

const BalancesPage = async () => {
  const { orgId, userId } = auth();

  const startDate = startOfMonth(new Date());
  const endDate = endOfMonth(new Date());

  if (!orgId || !userId) {
    return null;
  }

  const monthTotalExpense = await db.expenseUser.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      amount: true,
    },
  });

  const thisMonthTotalExpense = monthTotalExpense.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0
  );

  return (
    <div className="w-full">
      <Info />
      <Separator className="my-4" />

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex-1">
          <BalanceList />
        </div>
        <div className="flex-1">
          <div className="flex gap-2 px-2 md:px-4 text-md sm:text-lg">
            <div className="flex items-center font-semibold text-neutral-700">
              <PercentDiamond className="h-6 w-6 mr-2" />
              This month&apos;s spending :
            </div>
            <h1 className="font-semibold">{thisMonthTotalExpense} ₹</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancesPage;
