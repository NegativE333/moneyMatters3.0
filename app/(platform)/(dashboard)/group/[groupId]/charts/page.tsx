import { auth } from "@clerk/nextjs";
import { subDays, startOfDay, format } from "date-fns";
import { Info } from "../_components/info/info";
import { LineChart } from "./_components/line-chart";
import { db } from "@/lib/db";
import { BarChart } from "./_components/bar-chart";

interface DailyExpense {
  day: string;
  totalExpense: number;
}

async function getWeeklyExpense(userId: string): Promise<DailyExpense[]> {
  const startDate = subDays(new Date(), 7);
  const expenses = await db.expenseUser.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
  });

  const dailyExpenses: DailyExpense[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = startOfDay(subDays(new Date(), i));
    const totalExpense = expenses
      .filter(
        (expense) =>
          startOfDay(expense.createdAt).getTime() === currentDate.getTime()
      )
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

    dailyExpenses.push({
      day: format(currentDate, "MMM d"),
      totalExpense,
    });
  }

  return dailyExpenses;
}

const ChartsPage = async () => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return null;
  }

  const sevenDaysExpenseData = await getWeeklyExpense(userId);

  const balances = await db.balance.findMany({
    where: {
      orgId,
    },
    include: {
      users: {
        select: {
          userId: true,
          userName: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <div className="w-full">
      <Info />
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex-1">
          <LineChart
            expDay={sevenDaysExpenseData.map((data) => data.day)}
            expAmt={sevenDaysExpenseData.map((data) => data.totalExpense)}
          />
        </div>
        <div className="flex-1">
          <BarChart
            balanceAmount={balances.map((bal) => bal.balance)}
            balanceName={balances.map((bal) =>
              bal.users.map((user) => user.userName)
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
