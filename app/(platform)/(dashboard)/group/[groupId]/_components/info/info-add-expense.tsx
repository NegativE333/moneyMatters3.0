import { FormPopover } from "@/components/form/form-popover"
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Plus } from "lucide-react"
import { redirect } from "next/navigation";


export const InfoAddExpense = async () => {

    const { orgId, userId } = auth();

    if(!orgId || !userId){
        return redirect('/select-org');
    }

    const groupID = await db.group.findFirst({
        where:{
            group: orgId
        }
    });

    const newUser = await db.user.findFirst({
        where:{
            userId: userId,
            groupId: groupID?.id
        }
    });

    if(!newUser || !groupID){
        return(
            null
        )
    }

    return(
        <FormPopover side="bottom" sideOffset={10}>
            <div 
                role="button"
                className="ml-auto flex items-center justify-center gap-2 p-2 border border-black/50 hover:border-black rounded-md"
            >
                <Plus className="h-4 w-4"/>
                <p className="hidden sm:block text-sm">
                        Add new expense
                </p>
            </div>
        </FormPopover>
    )
}