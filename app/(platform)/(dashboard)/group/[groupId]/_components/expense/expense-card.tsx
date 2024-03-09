"use client";

import { useCardModal } from "@/hooks/use-modal";
import { generateIcon } from "@/lib/generate-icon";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Ubuntu, Nunito } from "next/font/google";

interface ExpenseCardProps{
  id: string;
  title : string;
  addedBy : string;
  userId: string;
  expUserId: string;
  amount : string;
  createdAt: Date;
}

const font = Ubuntu({subsets: ['latin'], weight: ['400']});
const subFont = Nunito({subsets: ['latin']});

export const ExpenseCard = ({
  id,
  title,
  addedBy,
  userId,
  expUserId,
  amount,
  createdAt
} : ExpenseCardProps) => {

    const cardModal = useCardModal();

    const handleClick = () => {
      if(title !== "welcomeExpenseUnique"){
        cardModal.onOpen(id, userId);
      }
    }

  return(
      <div
        role="button"
        onClick={handleClick}
        className={cn("border border-neutral-700/90 rounded-md w-full md:w-[48%] lg:w-[32%] h-16 flex", font.className)}
      >
          <div className="bg-neutral-700 h-full w-[23%] flex justify-center items-center rounded-s-md text-white">
            {generateIcon(title.toLowerCase(), "h-8 w-8")}
          </div>
          <div className="flex flex-col w-[75%]">
            {title === "welcomeExpenseUnique" ? (
              <div className="flex m-1 ml-2 mr-2 h-[50%] text-[14px]">
                {addedBy} joined
              </div>
            ) : (
              <div className="flex mt-1 ml-2 mr-1 h-[50%]">
                <h1 
                  className={
                    cn("text-[17px] w-[70%] truncate", 
                    font.className)}
                >
                  {title}
                </h1>
                <h2 
                  className={cn("ml-auto truncate")}
                >
                  {amount} ₹
                </h2>
              </div>
            )}
            <div className="flex text-[10px] ml-2">
              {title !== "welcomeExpenseUnique" && (
                <p className={cn("truncate mt-2 w-[60%]", subFont.className)}>
                  Added by 
                  {expUserId !== userId ? (
                    <span className="font-semibold"> {addedBy}</span> 
                  ) : (
                    <span className="font-semibold"> You</span>
                  )}
                </p>
              )}
              <p className="ml-auto text-[10px] p-[3px] border rounded-xl font-semibold text-muted-foreground mb-1">
                {format(new Date(createdAt), "MMM d")}
              </p>
            </div>
          </div>
        </div>
  )
}