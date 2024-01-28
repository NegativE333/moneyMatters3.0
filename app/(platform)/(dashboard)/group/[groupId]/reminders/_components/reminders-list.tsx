import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { BellRing } from "lucide-react"
import { ReminderCard } from "./reminder-card";

export const RemindersList = async () => {

    const { userId, orgId } = auth();

    if(!userId || !orgId){
        return null;
    }

    const reminders = await db.reminder.findMany({
        where:{
            orgId
        },
        orderBy:{
            createdAt: "desc"
        }
    });

    return(
        <div className="px-2 md:px-4"> 
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <BellRing className="h-6 w-6 mr-2" />
                Reminders
            </div>
            {reminders.length === 0 && (
                <div className="text-center mt-8 text-muted-foreground">
                    No reminder added
                </div>
            )}
            <ScrollArea className="h-[480px] sm:h-[430px] w-full rounded-md">
                <div className="flex flex-col gap-4 mt-4">
                    {reminders.map((reminder) => (
                        <ReminderCard 
                            key={reminder.id}
                            data={reminder}
                            userId={userId}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}