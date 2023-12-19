import { InfoImage } from "./info-image";
import { InfoTitle } from "./info-title";
import { BalanceFetcher } from "./balanceFetcher";
import { InfoAddExpense } from "./info-add-expense";
import { Option } from "./option";

export const Info = () => {
  return (
    <div className="flex items-center gap-x-4 w-full">
      <InfoImage />
      <div className="space-y-1">
        <InfoTitle />
        <BalanceFetcher />
      </div>
      <Option />
      {/* <InfoAddExpense /> */}
    </div>
  );
};
