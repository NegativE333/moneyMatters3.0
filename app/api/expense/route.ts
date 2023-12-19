import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req : Request,
) {
    try{
        const { userId, orgId } = auth();

        if(!orgId || !userId){
            return new NextResponse("Unauthorized");
        }

        const expense = await db.expense.findMany({
            where:{
                orgId: orgId
            }
        });

        return NextResponse.json(expense);
    }
    catch(error){
        return new NextResponse("Internal Error", { status : 500 });
    }
}