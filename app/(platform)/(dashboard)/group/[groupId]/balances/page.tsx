import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info/info";
import { BalanceList } from "./_components/balance-list";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { startOfMonth, endOfMonth, startOfDay, endOfDay, format } from "date-fns";
import { PercentDiamond } from "lucide-react";

const BalancesPage = async () => {
  const { orgId, userId } = auth();

  const today = new Date();
  const startDate = startOfMonth(today);
  const endDate = endOfMonth(today);
  const startDay = startOfDay(today);
  const endDay = endOfDay(today);
  const Month = format(today, 'MMMM');
  const todayDate = format(today, 'd MMM');
  console.log(todayDate);

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

  const todayTotalExpense = await db.expenseUser.findMany({
    where:{
      userId: userId,
      createdAt: {
        gte: startDay,
        lte: endDay
      },
    },
    select:{
      amount : true
    }
  });

  const thisMonthTotalExpense = monthTotalExpense.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0
  );

  const todayTotal = todayTotalExpense.reduce(
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
          <div className="flex flex-col gap-4 px-2 md:px-4 text-md sm:text-lg">
            <div className="flex gap-2">
              <div className="flex items-center font-semibold text-neutral-700">
                <PercentDiamond className="h-6 w-6 mr-2" />
                {todayDate}&apos;s total expense :
              </div>
              <div className="ml-auto">
                <h1 className="font-semibold">{todayTotal} ₹</h1>
              </div>
            </div>
            <Separator />
            <div className="flex gap-2">
              <div className="flex items-center font-semibold text-neutral-700">
                <PercentDiamond className="h-6 w-6 mr-2" />
                {Month}&apos;s total expense :
              </div>
              <div className="ml-auto">
                <h1 className="font-semibold">{thisMonthTotalExpense} ₹</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancesPage;
