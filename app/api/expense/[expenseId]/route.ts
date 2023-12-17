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

        const expense = await db.expense.findUnique({
            where:{
                id: params.expenseId
            }
        });

        return NextResponse.json(expense);
    }
    catch(error){
        return new NextResponse("Internal Error", { status : 500 });
    }
}