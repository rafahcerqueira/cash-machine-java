import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    accountType: z.enum(["CORRENTE", "POUPANCA"], {
      errorMap: () => ({ message: "Tipo de conta inválido" }),
    }),
    accountLevel: z.enum(["OURO", "PRATA", "BRONZE"], {
      errorMap: () => ({ message: "Nível de conta inválido" }),
    }),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });
