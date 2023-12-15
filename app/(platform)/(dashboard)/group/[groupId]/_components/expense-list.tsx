import { FormPopover } from "@/components/form/form-popover"
// import { Hint } from "@/components/hint"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Users } from "lucide-react"
import { redirect } from "next/navigation"
import { format } from 'date-fns';
import { generateIcon } from "@/lib/generate-icon"

export const ExpenseList = async () => {

    const { orgId } = auth();

    if(!orgId){
        return redirect("/select-org");
    }

    const expenses = await db.expense.findMany({
        where:{
            orgId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    // console.log(expenses);

    return(
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <Users className="h-6 w-6 mr-2"/>
                Group Expenses
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {expenses.map((exp) => (
                    <div
                        key={exp.id}
                        className="border border-neutral-700/90 rounded-md w-full sm:w-[264px] h-16 flex">
                        <div className="bg-neutral-700 h-full w-[25%] flex justify-center items-center rounded-s-md text-white">
                            {generateIcon(exp.title.toLowerCase())}
                        </div>
                        <div className="flex flex-col w-[75%]">
                            <div className="flex m-1 ml-2 mr-2 h-[50%]">
                                <h1 className="text-[17px] w-[70%] truncate">
                                    {exp.title}
                                </h1>
                                <h1 className="text-">
                                </h1>
                                <h2 className="ml-auto">
                                    {exp.amount} ₹
                                </h2>

                            </div>
                            <div className="flex text-[10px] ml-2">
                                <p className="truncate mt-2 w-[70%]">
                                    Added by {exp.addedBy}
                                </p>
                                <p className="ml-auto text-[11px]  p-1 border rounded-xl mr-2 mb-2 font-semibold">
                                    {format(new Date(exp.createdAt), "MMM d")}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

ExpenseList.Skeleton = function ExpenseListSkeleton(){
    return(
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
        </div>
    )
}