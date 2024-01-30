import { Loader } from "lucide-react";
import { Info } from "../_components/info/info";

const BalancesLoading = () => {
    return (  
        <div className="w-full">
            <Info />
            <div className="h-[50vh] flex items-center justify-center">
                <Loader className="animate-spin h-8 w-8"/>
            </div>
        </div>
    );
}
 
export default BalancesLoading;