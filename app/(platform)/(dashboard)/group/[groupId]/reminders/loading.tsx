import { Loader } from "lucide-react";
import { Info } from "../_components/info/info";

const RemindersLoading = () => {
    return (  
        <div className="w-full">
            <Info />
            <div className="h-[50vh] flex items-center justify-center">
                <Loader className="animate-spin "/>
            </div>
        </div>
    );
}
 
export default RemindersLoading;