import { z } from "zod";
import { Balance } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { GetBalance } from "./schema";

export type InputType = z.infer<typeof GetBalance>;
export type ReturnType = ActionState<InputType, Balance>;