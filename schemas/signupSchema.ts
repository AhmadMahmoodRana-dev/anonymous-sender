import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(5, "Username must be at least 5 characters long")
  .max(25, "Username must not be greater than 25 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");

  export const emailValidation = z
  .string()
  .email("Please enter a valid email address");

  export const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(50, "Password must not be greater than 50 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@, $, !, %, *, ?, &, #)");

  export const signUpSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
  })