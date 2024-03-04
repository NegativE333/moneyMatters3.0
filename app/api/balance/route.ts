import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req : Request) {
    try{
        const { userId, orgId } = auth();

        if(!orgId || !userId){
            return new NextResponse("Unauthorized");
        }

        const groupID = await db.group.findFirst({
            where:{
                group: orgId
            }
        });

        if(!groupID){
            return new NextResponse("Group id not found.")
        }

        const user = await db.user.findFirst({
            where:{
                groupId: groupID.id
            }
        })

        if(!user){
            return new NextResponse("User not found.");
        }

        const balance = await db.balance.findFirst({
            where:{
                id: user.balanceId
            }
        });
        
        return NextResponse.json(balance);
    }
    catch(error){
        return new NextResponse("Internal Error", { status : 500 });
    }
}