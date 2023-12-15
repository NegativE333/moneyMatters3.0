import { z } from "zod";
import { Expense } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CreateExpense } from "./schema";

export type InputType = z.infer<typeof CreateExpense>;
export type ReturnType = ActionState<InputType, Expense>;