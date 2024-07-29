import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    senha: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmar_senha: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres"),
  })
  .refine((data) => data.senha === data.confirmar_senha, {
    message: "As senhas devem ser iguais",
    path: ["confirmar_senha"],
  });
