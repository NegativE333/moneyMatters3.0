import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info/info";
import { BalanceList } from "./_components/balance-list";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  format,
  subMonths,
  getDaysInMonth,
} from "date-fns";
import { PercentCircle } from "lucide-react";

const BalancesPage = async () => {
  const { orgId, userId } = auth();

  const today = new Date();
  const startDate = startOfMonth(today);
  const endDate = endOfMonth(today);
  const prevMonthStart = startOfMonth(subMonths(today, 1));
  const prevMonthEnd = endOfMonth(subMonths(today, 1));
  const daysInThisMonth = parseInt(format(today, 'd'), 10);
  const daysInPrevMonth = getDaysInMonth(subMonths(today, 1));
  const startDay = startOfDay(today);
  const endDay = endOfDay(today);

  if (!orgId || !userId) {
    return null;
  }

  const lastMonthExpenses = await db.expenseUser.findMany({
    where: {
      userId: userId,
      groupId: orgId,
      createdAt: {
        gte: prevMonthStart,
        lte: prevMonthEnd,
      },
    },
    select: {
      amount: true,
    },
  });

  const monthTotalExpense = await db.expenseUser.findMany({
    where: {
      userId: userId,
      groupId: orgId,
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
    where: {
      userId: userId,
      groupId: orgId,
      createdAt: {
        gte: startDay,
        lte: endDay,
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

  const lastMonthTotalExpense = lastMonthExpenses.reduce(
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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <BalanceList />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-4 px-2 md:px-4 text-sm sm:text-md">
            <div className="flex gap-2">
              <div className="flex items-center font-semibold text-neutral-700">
              <PercentCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Today&apos;s total expense :
              </div>
              <div className="ml-auto">
                <h1 className="font-semibold">
                  {todayTotal.toFixed(2)} ₹
                </h1>
              </div>
            </div>
            {thisMonthTotalExpense > 0 && (
              <>
                <Separator />
                <div className="flex gap-2">
                  <div className="flex items-center font-semibold text-neutral-700">
                  <PercentCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    This Month total expense :
                  </div>
                  <div className="ml-auto">
                    <h1 className="font-semibold">
                      {thisMonthTotalExpense.toFixed(2)} ₹
                    </h1>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <div className="flex items-center font-semibold text-neutral-700">
                    <PercentCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    This Month average expense :
                  </div>
                  <div className="ml-auto">
                    <h1 className="font-semibold">
                      {(thisMonthTotalExpense / daysInThisMonth).toFixed(2)} ₹
                    </h1>
                  </div>
                </div>
              </>
            )}
            {lastMonthTotalExpense > 0 && (
              <>
                <Separator />
                <div className="flex gap-2">
                  <div className="flex items-center font-semibold text-neutral-700">
                  <PercentCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Last Month total expense :
                  </div>
                  <div className="ml-auto">
                    <h1 className="font-semibold">
                      {lastMonthTotalExpense.toFixed(2)} ₹
                    </h1>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <div className="flex items-center font-semibold text-neutral-700">
                  <PercentCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Last Month average expense :
                  </div>
                  <div className="ml-auto">
                    <h1 className="font-semibold">{(lastMonthTotalExpense/daysInPrevMonth).toFixed(2)} ₹</h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancesPage;
