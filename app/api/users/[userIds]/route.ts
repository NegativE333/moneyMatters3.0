import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { userIds: string } }
) {
    try {

        const userIdArray = params.userIds.split(",");

        const users = await db.user.findMany({
            where: {
                userId: { in: userIdArray },
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
