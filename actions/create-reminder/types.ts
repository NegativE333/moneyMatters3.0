import { z } from "zod";
import { Reminder } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CreateReminder } from "./schema";

export type InputType = z.infer<typeof CreateReminder>;
export type ReturnType = ActionState<InputType, Reminder>;