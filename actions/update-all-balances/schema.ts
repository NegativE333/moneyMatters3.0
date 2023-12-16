import { z } from "zod";

export const UserExpense = z.object({
    id: z.string({
        required_error: "User ID is required",
        invalid_type_error: "Invalid User ID",
    }),
    amount : z.string({
        required_error: "Expense amount is required",
        invalid_type_error: "Invalid expense amount",
    })
})

export const UpdateAllBalances = z.object({
    users : z.array(UserExpense)
})