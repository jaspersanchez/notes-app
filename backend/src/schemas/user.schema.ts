import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .pipe(z.email({ error: "Invalid email format" })),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password too short" }),
});

export const RegisterSchema = LoginSchema.extend({
  name: z
    .string({ error: "Name is required" })
    .min(1, { error: "Name is too short" }),
});
