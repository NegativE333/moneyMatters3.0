import { z } from "zod";
import { Balance } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateAllBalances } from "./schema";

export type InputType = z.infer<typeof UpdateAllBalances>;
export type ReturnType = ActionState<InputType, Balance>;