import { z } from "zod";

export const LoginSchema = z.object({
  cpf: z.string().min(11, "O CPF deve conter no mínimo 11 caracteres"),
  senha: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});
