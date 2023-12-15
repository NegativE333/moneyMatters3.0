import { z } from "zod";

export const UpdateBalance = z.object({
    amount: z.string()
})