"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { GetBalance } from "./schema";

const handler = async (data : InputType) : Promise<ReturnType> => {
    const { userId } = auth();

    if(!userId){
        return{
            error: "Unauthorized",
        }
    }

    const user = await currentUser();

    let balanceAmount;

    try{
        const balanceAmount = await db.balance.findUnique({
            where:{
                userId: userId
            }
        });
    }
    catch(error){
        return{
            error: "Failed to create expense."
        }
    }

    revalidatePath(`/group/${balanceAmount}`);
    return{ data : balanceAmount }
}

export const getBalance = createSafeAction(GetBalance, handler);