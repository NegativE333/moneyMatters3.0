"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBalance } from "./schema";

const handler = async (data : InputType) : Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId){
        return{
            error: "Unauthorized",
        }
    }

    const { amount } = data;

    let balanceAmount;

    try{

        const balId = await db.balance.findFirst({
            where:{
                userId: userId,
                orgId
            }
        });

        if(balId !== null){
            const finalBalance = parseInt(balId.balance) + parseInt( amount);

            balanceAmount = await db.balance.update({
                where:{
                    id: balId?.id,
                },
                data: {
                    balance : finalBalance.toString()
                }
            });
        }
        else{
            balanceAmount = await db.balance.create({
                data: {
                    userId : userId,
                    orgId,
                    balance : amount
                }
            });
        }
    }
    catch(error){
        console.log("Failed..........");
        return{
            error: "Failed to create expense."
        }
    }

    revalidatePath(`/group/${balanceAmount.userId}`);
    return{ data : balanceAmount }
}

export const updateBalance = createSafeAction(UpdateBalance, handler);