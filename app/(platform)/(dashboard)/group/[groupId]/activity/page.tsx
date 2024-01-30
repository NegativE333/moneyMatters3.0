import { ActivityList } from "./_components/activity-list";
import { Suspense } from "react";
import { Info } from "../_components/info/info";

const ActivityPage = () => {
    return (  
        <div className="w-full">
            <Info />
            
            <Suspense fallback={<ActivityList.Skeleton/>}>
                <ActivityList />
            </Suspense>
        </div>
    );
}
 
export default ActivityPage;