import { z } from "zod";
import { Balance } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateAllBalancesAfterDelete } from "./schema";

export type InputType = z.infer<typeof UpdateAllBalancesAfterDelete>;
export type ReturnType = ActionState<InputType, Balance>;