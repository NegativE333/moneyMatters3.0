import { z } from "zod";

export const CreateExpense = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(1, {
        message: "Title is too short."
    }),
    amount: z.string().min(1, {
        message: "Amount is required"
    }),
})