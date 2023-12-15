import { FormPopover } from "@/components/form/form-popover";
import { Plus } from "lucide-react";
import { InfoImage } from "./info/info-image";
import { InfoTitle } from "./info/info-title";
import { BalanceFetcher } from "./balanceFetcher";


export const Info = () => {

    return(
        <div className="flex items-center gap-x-4 w-full">
            <InfoImage />
            <div className="space-y-1">
                <InfoTitle />
                <BalanceFetcher />
            </div>
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
        </div>
    )
}