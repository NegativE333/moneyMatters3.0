import { BadgeIndianRupee, Loader } from "lucide-react";
import { Info } from "../_components/info/info";

const BalancesLoading = () => {
    return (  
        <div className="w-full">
            <Info />
            <div className="h-[50vh] flex items-center justify-center">
            <BadgeIndianRupee className="animate-ping h-12 w-12"/>
            </div>
        </div>
    );
}
 
export default BalancesLoading;