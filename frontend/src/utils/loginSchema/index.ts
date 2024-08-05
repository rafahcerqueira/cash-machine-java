import { z } from "zod";

export const LoginSchema = z.object({
  accountNumber: z.string().min(9, "A conta deve conter 9 caracteres"),
  name: z.string().min(1, "O nome não pode ser vazio"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});
