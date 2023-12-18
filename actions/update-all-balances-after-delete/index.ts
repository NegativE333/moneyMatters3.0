"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateAllBalancesAfterDelete } from "./schema";

const handler = async (data : InputType) : Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId){
        return{
            error: "Unauthorized",
        }
    }

    const { users } = data;

    let balanceAmount;

    try{

        const groupId = await db.group.findFirst({
            where:{
                group: orgId
            }
        });

        if(!groupId){
            return{
                error: "Group not found"
            }
        }

        const creatorUser = await db.user.findFirst({
            where:{
                userId,
                groupId: groupId.id
            }
        });

        if(!creatorUser){
            return{
                error: "Creator not found"
            }
        }

        const balanceIds = await Promise.all(
            users.map(async (user) => {
                const userBalance = await db.balance.findFirst({
                    where:{
                        userId: user.id,
                        orgId,
                    },
                });
                return userBalance?.id || null;
            })
        );

        let lentedAmount = 0;
        
        for(const balanceId of balanceIds){
            if(balanceId && balanceId !== creatorUser.balanceId){
                const individualBalance = await db.balance.findFirst({
                    where:{
                        id: balanceId,
                    }
                });

                console.log(balanceId);

                if(individualBalance){
                    const updatedBalanceAmount = parseFloat(individualBalance.balance) + parseFloat(users.find((user) => user.id === individualBalance.userId)?.amount || '0');

                    lentedAmount += parseFloat(users.find((user) => user.id === individualBalance.userId)?.amount || '0');

                    await db.balance.update({
                        where:{
                            id: balanceId,
                        },
                        data:{
                            balance: updatedBalanceAmount.toString()
                        }
                    })
                }
            }
        }

        const previousBalance = await db.balance.findFirst({
            where:{
                id: creatorUser.balanceId
            }
        });

        if(previousBalance){
            const finalBalance = parseFloat(previousBalance?.balance) - lentedAmount;

            const updateCreatorBalance = await db.balance.update({
                where:{
                    id: creatorUser.balanceId,
                },
                data:{
                    balance: finalBalance.toString()
                }
            })
        }
    }
    catch(error){
        console.log("Failed..........");
        return{
            error: "Failed to create expense."
        }
    }

    revalidatePath(`/group`);
    return{ data : balanceAmount }
}

export const updateAllBalancesAfterDelete = createSafeAction(UpdateAllBalancesAfterDelete, handler);