import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info/info";
import { RemindersList } from "./_components/reminders-list";

const Reminders = () => {
    return (  
        <div className="w-full">
            <Info />
            <Separator className="my-4"/>
            <RemindersList />
        </div>
    );
}
 
export default Reminders;