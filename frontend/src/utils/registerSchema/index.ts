import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "O nome não pode ser vazio"),
    accountType: z.string(),
    accountLevel: z.string(),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });
