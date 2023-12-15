import { z } from "zod";
import { Group } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CreateGroup } from "./schema";

export type InputType = z.infer<typeof CreateGroup>;
export type ReturnType = ActionState<InputType, Group>;