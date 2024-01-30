import { InfoImage } from "./info-image";
import { InfoTitle } from "./info-title";
import { BalanceFetcher } from "./balanceFetcher";
import { InfoAddExpense } from "./info-add-expense";
import { Option } from "./option";
import { Separator } from "@/components/ui/separator";

export const Info = () => {
  return (
    <div>
      <div className="flex items-center gap-x-2 sm:gap-x-4 w-full">
        <InfoImage />
        <div className="space-y-1">
          <InfoTitle />
          <BalanceFetcher />
        </div>
        <Option />
        {/* <InfoAddExpense /> */}
      </div>
      <Separator className="my-4"/>
    </div>
  );
};
