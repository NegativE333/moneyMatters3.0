import { ActivityItem } from "@/app/(platform)/(dashboard)/group/[groupId]/activity/_components/activity-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { GanttChart } from "lucide-react";
import { redirect } from "next/navigation";

export const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-2 md:px-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <GanttChart className="h-6 w-6 mr-2" />
        Recent Actions
      </div>
      {auditLogs.length === 0 ? (
        <div className="text-center mt-8 text-muted-foreground">
          No recent actions found
        </div>
      ) : (
        <ScrollArea className="h-[490px] sm:h-[430px] w-full rounded-md">
          <ol className="space-y-4 mt-4">
            <p className="hidden last:block text-xs text-center text-muted-foreground">
              No activity found inside this group
            </p>
            {auditLogs.map((log) => (
              <ActivityItem key={log.id} data={log} />
            ))}
          </ol>
        </ScrollArea>
      )}
    </div>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
    </ol>
  );
};
