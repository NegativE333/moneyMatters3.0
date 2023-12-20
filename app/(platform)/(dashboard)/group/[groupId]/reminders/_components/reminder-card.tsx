import { Button } from "@/components/ui/button";
import { Reminder } from "@prisma/client"
import Image from "next/image";
import { ReminderHoverCard } from "./reminder-hover-card";
import { Maximize2 } from "lucide-react";


interface ReminderCardProps{
    data: Reminder;
    userId: string;
}

export const ReminderCard = ({
    data,
    userId
} : ReminderCardProps) => {
    return(
        <div className="w-full sm:w-[350px] h-[48px] border border-black/50 flex gap-2 rounded-md">
            <Image 
                src={data.imageUrl}
                alt="img"
                height={47}
                width={47}
                className="rounded-s-sm"
            />
            <div className="text-sm sm:text-md text-muted-foreground text-center overflow-hidden p-1">
                <span className="text-black/90 font-medium">{data.userName}</span> created a reminder <span className="text-black/90 font-medium">{data.title}</span>
            </div>
            <ReminderHoverCard
                data={data}
                userId={userId}
            >
                <Button className="ml-auto h-full" variant="ghost">
                    <Maximize2 className="h-4 w-4 animate-pulse duration-[2000ms]"/>
                </Button>
            </ReminderHoverCard>
        </div>
    )
}