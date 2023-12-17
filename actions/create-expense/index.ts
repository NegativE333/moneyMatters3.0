"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateExpense } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId, orgSlug } = auth();
  
    const user = await currentUser();
    if (!userId || !orgId || !orgSlug || !user) {
      return {
        error: "Unauthorized",
      };
    }
  
    const { title, amount, users } = data;
  
    let expense;
  
    try {
        let bal;
        bal = await db.balance.findFirst({
            where:{
                userId,
                orgId
            }
        })

        if(bal === null){
            bal = await db.balance.create({
                data:{
                    userId,
                    orgId
                }
            })
        }
        
      const groupExists = await db.group.findFirst({
        where: {
          group: orgId,
        },
      });
  
      if (!groupExists) {
        // Create the group if it doesn't exist
        console.log("creating new grop")
            await db.group.create({
              data: {
                group: orgId,
                title: orgSlug,
                users: {
                  create: [
                    {
                        userId,
                        userName: user.firstName + " " + user.lastName,
                        imageUrl: user.imageUrl,
                        balanceId: bal.id
                    },
                  ],
                },
              },
            });
      } else {
        // Check if the user is already part of the group

        const groupID = await db.group.findFirst({
          where:{
            group: orgId
          }
        })

        if(groupID){
            const userInGroup = await db.user.findFirst({
              where: {
                userId,
                groupId: groupID.id
              },
            });
    
            console.log({userInGroup});
      
            if (!userInGroup) {
              // Add the user to the group if not already part of it
              await db.user.create({
                data: {
                    userId,
                    userName: user.firstName + " " + user.lastName,
                    imageUrl: user.imageUrl,
                    groupId: groupID.id,
                    balanceId: bal.id
                },
              });
            }
          }
        }

      // Create the expense
      expense = await db.expense.create({
        data: {
          title,
          amount,
          orgId,
          addedBy: user?.firstName + " " + user?.lastName,
        },
      });

      const exp = expense;

      let createExpUser;

      // const userNames = await Promise.all(
      //   users.map(async (user) => {
      //     const userName = await db.user.findUnique({
      //       where:{
      //         id: user.id
      //       }
      //     });
      //     return userName?.userName;
      //   })
      // );

      // for(const userName of userNames){
      //   await db.expenseUser.create({
      //     data:{
      //       expenseId: exp.id,
      //       userId: user.id,
      //       amount: user.amount
      //     }
      //   })
      // }

      try{
        const transaction = users.map((user) => 
          db.expenseUser.create({
            data:{
              expenseId: exp.id,
              userId: user.id,
              amount: user.amount
            }
          })
        );

        createExpUser = await db.$transaction(transaction);
      }
      catch(error){
        console.log(error);
      }

    } catch (error) {
      return {
        error: `Error : ${error}  orgId: ${orgId}`,
      };
    }
  
    revalidatePath(`/group/${expense.id}`);
    return { data: expense };
  };
  
  export const createExpense = createSafeAction(CreateExpense, handler);
  