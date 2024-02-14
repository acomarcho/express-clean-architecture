import { z } from "zod";

export const registerRequestSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const loginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});
