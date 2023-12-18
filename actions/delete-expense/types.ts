import { z } from "zod";
import { Expense } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { DeleteExpense } from "./schema";

export type InputType = z.infer<typeof DeleteExpense>;
export type ReturnType = ActionState<InputType, Expense>;