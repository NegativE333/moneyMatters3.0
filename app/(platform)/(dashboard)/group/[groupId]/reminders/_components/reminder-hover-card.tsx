"use client";

import { deleteReminder } from "@/actions/delete-reminder";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useAction } from "@/hooks/use-action";
import { db } from "@/lib/db";
import { Reminder } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, Trash } from "lucide-react";
import { toast } from "sonner";

interface ReminderHoverCardProps{
    children: React.ReactNode;
    data: Reminder;
    userId: string;
}

export const ReminderHoverCard = ({
    children,
    data,
    userId
} : ReminderHoverCardProps) => {

    const {execute} = useAction(deleteReminder, {
      onSuccess: (data) => {
        toast.success("Reminder deleted!");
      },
      onError: (error) => {
        toast.error("Failed to delete reminder.");
      }
    })

    const onSubmit = () => {
        execute({ id : data.id })
    }

    return(
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent
                align="center"
                side="right"
                sideOffset={6}
            >
                <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{data.title}</h4>
            <p className="text-sm">
              {data.desc}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Created at {format(new Date(data?.createdAt), "MMM d, yyyy")}
              </span>
              {userId === data.userId && (
                <Button 
                  onClick={onSubmit}
                  className="ml-auto" 
                  variant="ghost"
                >
                  <Trash className="h-4 w-4 opacity-90"/>
                </Button>
              )}
            </div>
          </div>
        </div>
            </HoverCardContent>
        </HoverCard>
    )
}