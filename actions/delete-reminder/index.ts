"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteReminder } from "./schema";
import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId, orgSlug } = auth();
  
    const user = await currentUser();
    if (!userId || !orgId || !orgSlug || !user) {
      return {
        error: "Unauthorized",
      };
    }
  
    const { id } = data;
  
    let reminder;
  
    try {
        reminder = await db.reminder.delete({
          where:{
            id: id
          }
        });

        await createAuditLogs({
          entityId: reminder.id,
          entityTitle: reminder.title,
          entityType: ENTITY_TYPE.EXPENSE,
          action: ACTION.DELETE
        });
        
    } catch (error) {
      return {
        error: `Error : ${error}  orgId: ${orgId}`,
      };
    }
  
    revalidatePath(`/group/${reminder}`);
    return { data: reminder };
  };
  
  export const deleteReminder = createSafeAction(DeleteReminder, handler);
  