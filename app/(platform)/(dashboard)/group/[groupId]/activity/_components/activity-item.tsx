import { AuditLog } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { generateLogMessage } from "@/lib/generate-log-message";

interface ActivityItemProps {
  data: AuditLog;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImg} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-neutral-700">
            {data.userName}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        <p>{format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
      </div>
    </li>
  );
};
