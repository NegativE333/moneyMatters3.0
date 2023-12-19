"use client";

import { useCardModal } from "@/hooks/use-modal";
import { generateIcon } from "@/lib/generate-icon";
import { currentUser } from "@clerk/nextjs";
import { format } from "date-fns";

interface ExpenseCardProps{
  id: string;
  title : string;
  addedBy : string;
  amount : string;
  createdAt: Date;
}

export const ExpenseCard = ({
  id,
  title,
  addedBy,
  amount,
  createdAt
} : ExpenseCardProps) => {

    const cardModal = useCardModal();

    const handleClick = () => {
      if(title !== "welcomeExpenseUnique"){
        cardModal.onOpen(id);
      }
    }

  return(
      <div
        role="button"
        onClick={handleClick}
        className="border border-neutral-700/90 rounded-md w-full sm:w-[240px] h-16 flex"
      >
          <div className="bg-neutral-700 h-full w-[25%] flex justify-center items-center rounded-s-md text-white">
            {generateIcon(title.toLowerCase(), "h-10 w-10")}
          </div>
          <div className="flex flex-col w-[75%]">
            {title === "welcomeExpenseUnique" ? (
              <div className="flex m-1 ml-2 mr-2 h-[50%] text-[14px]">
                {addedBy} joined
              </div>
            ) : (
              <div className="flex m-1 ml-2 mr-2 h-[50%]">
                <h1 className="text-[17px] w-[70%] truncate">{title}</h1>
                <h2 className="ml-auto">{amount} ₹</h2>
              </div>
            )}
            <div className="flex text-[10px] ml-2">
              {title !== "welcomeExpenseUnique" && (
                <p className="truncate mt-2 w-[60%]">
                  Added by {addedBy}
                </p>
              )}
              <p className="ml-auto text-[11px]  p-1 border rounded-xl mr-2 mb-2 font-semibold">
                {format(new Date(createdAt), "MMM d")}
              </p>
            </div>
          </div>
        </div>
  )
}