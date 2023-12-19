import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req : Request,
    { params } : { params : { orgId : string}}
) {
    try{
        const { userId, orgId } = auth();

        if(!orgId || !userId){
            return new NextResponse("Unauthorized");
        }

        const expenses = await db.expense.findMany({
            where:{
                orgId: params.orgId
            }
        });

        const totalAmount = expenses.reduce((sum, expense) => sum + parseInt(expense.amount), 0);


        return NextResponse.json({ totalAmount });
    }
    catch(error){
        return new NextResponse("Internal Error", { status : 500 });
    }
}