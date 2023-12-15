import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId, orgId } = auth();

    if (!orgId || !userId) {
      return new NextResponse("Unauthorized");
    }
    
    // Find the group by orgId
    const group = await db.group.findFirst({
      where: {
        group: orgId,
      }
    });

    if (!group) {
      return new NextResponse("Group not found", { status: 404 });
    }

    const members = await db.user.findMany({
        where:{
            groupId: group.id
        }
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
