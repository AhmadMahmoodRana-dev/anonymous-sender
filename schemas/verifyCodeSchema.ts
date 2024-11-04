import { z } from "zod";

export const code = z
  .string()
 .length(6,"Verification Code must be 6 digits")

 export const verifySchema = z.object({
    code: code
 })
  