import { z } from "zod";

export const CreateReminder = z.object({
    title: z.string().min(3),
    desc: z.string().min(3),
})