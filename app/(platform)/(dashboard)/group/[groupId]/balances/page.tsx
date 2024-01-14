import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info/info";
import { BalanceList } from "./_components/balance-list";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { BarChart } from "./_components/bar-chart";

const BalancesPage = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return null;
  }

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
      <Separator className="my-4" />

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex-1">
          <BalanceList />
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

export default BalancesPage;
