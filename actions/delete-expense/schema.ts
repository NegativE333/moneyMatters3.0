import { z } from "zod";

export const DeleteExpense = z.object({
    id: z.string(),
})