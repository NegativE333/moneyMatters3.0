import { BellRing } from "lucide-react"

export const RemindersList = () => {
    return(
        <div className="px-2 md:px-4"> 
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <BellRing className="h-6 w-6 mr-2" />
                Reminders
            </div>
        </div>
    )
}