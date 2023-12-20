import { z } from "zod";

export const DeleteReminder = z.object({
    id: z.string(),
})