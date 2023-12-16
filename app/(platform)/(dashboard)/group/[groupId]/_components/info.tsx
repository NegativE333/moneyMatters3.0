import { InfoImage } from "./info/info-image";
import { InfoTitle } from "./info/info-title";
import { BalanceFetcher } from "./info/balanceFetcher";
import { InfoAddExpense } from "./info/info-add-expense";


export const Info = () => {

    return(
        <div className="flex items-center gap-x-4 w-full">
            <InfoImage />
            <div className="space-y-1">
                <InfoTitle />
                <BalanceFetcher />
            </div>
            <InfoAddExpense />
        </div>
    )
}