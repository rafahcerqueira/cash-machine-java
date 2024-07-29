import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(11, "A conta deve conter no mínimo 11 caracteres"),
    cpf: z.string().min(11, "O CPF deve conter 11 caracteres"),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirm_password: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas devem ser iguais",
    path: ["confirm_password"],
  });
