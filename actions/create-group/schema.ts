import { z } from "zod";

export const CreateGroup = z.object({
    amount: z.string()
})