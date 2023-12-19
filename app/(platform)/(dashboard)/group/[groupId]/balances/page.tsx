import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info/info";
import { BalanceList } from "./_components/balance-list";

const BalancesPage = () => {
    return (  
        <div className="w-full">
            <Info />
            <Separator className="my-4"/>
            {/* <Suspense fallback={<ActivityList.Skeleton/>}> */}
                <BalanceList />
            {/* </Suspense> */}
        </div>
    );
}
 
export default BalancesPage;