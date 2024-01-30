import { Info } from "../_components/info/info";
import { RemindersList } from "./_components/reminders-list";

const Reminders = () => {
    return (  
        <div className="w-full">
            <Info />
            <RemindersList />
        </div>
    );
}
 
export default Reminders;