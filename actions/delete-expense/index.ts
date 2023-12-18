"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteExpense } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId, orgSlug } = auth();
  
    const user = await currentUser();
    if (!userId || !orgId || !orgSlug || !user) {
      return {
        error: "Unauthorized",
      };
    }
  
    const { id } = data;
  
    let expense;

    const findExpenseToDelete  = await db.expense.findUnique({
      where:{
        id: id
      }
    });

    if(findExpenseToDelete?.userId !== userId){
      return{
        error: "You can not delete this expense."
      }
    }
  
    try {
        expense = await db.expense.delete({
          where:{
            id: id
          }
        })
    } catch (error) {
      return {
        error: `Error : ${error}  orgId: ${orgId}`,
      };
    }
  
    revalidatePath(`/group/${expense}`);
    return { data: expense };
  };
  
  export const deleteExpense = createSafeAction(DeleteExpense, handler);
  