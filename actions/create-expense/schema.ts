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
    users: z.array(UserExpense),
})