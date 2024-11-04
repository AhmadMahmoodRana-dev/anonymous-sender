import { z } from "zod";

export const MessageSchema = z.object({
    content: z.string().
    min(10,{message:"Content must be atleast of 10 characters"}).
    max(300,{message:"Content must not be greater then 300 characters"})
  })