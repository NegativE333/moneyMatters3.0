import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"


export const FormPicker = async () => {

    const { orgId } = auth();

    if(!orgId){
        return <>Loading</>;
    }

    const members = await db.group.findUnique({
        where:{
            id: orgId
        }
    });

    console.log(members);

    return(
        <div className="h-full">
            Members
        </div>
    )
}