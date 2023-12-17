import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req : Request,
    { params } : { params : { expenseId : string}}
) {
    try{
        const { userId, orgId } = auth();

        if(!orgId || !userId){
            return new NextResponse("Unauthorized");
        }

        const members = await db.expenseUser.findMany({
            where:{
                expenseId: params.expenseId
            }
        });

        return NextResponse.json(members);
    }
    catch(error){
        return new NextResponse("Internal Error", { status : 500 });
    }
}