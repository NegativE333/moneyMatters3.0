"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateGroup } from "./schema";

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

        const ifExists = await db.group.findUnique({
            where:{
                userId: userId,
                orgId
            }
        });

        if(ifExists){
            const finalBalance = parseInt(ifExists.balance) + parseInt( amount);

            balanceAmount = await db.balance.update({
                where:{
                    userId : userId,
                    orgId
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
        return{
            error: "Failed to create expense."
        }
    }

    revalidatePath(`/group/${balanceAmount.userId}`);
    return{ data : balanceAmount }
}

export const createGroup = createSafeAction(CreateGroup, handler);