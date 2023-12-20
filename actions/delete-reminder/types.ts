import { z } from "zod";
import { Expense, Reminder } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { DeleteReminder } from "./schema";

export type InputType = z.infer<typeof DeleteReminder>;
export type ReturnType = ActionState<InputType, Reminder>;