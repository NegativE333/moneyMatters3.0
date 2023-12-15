import { z } from "zod";
import { Balance } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateBalance } from "./schema";

export type InputType = z.infer<typeof UpdateBalance>;
export type ReturnType = ActionState<InputType, Balance>;