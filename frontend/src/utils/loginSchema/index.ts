import { z } from "zod";

export const LoginSchema = z.object({
  account: z.string().min(11, "A conta deve conter no mínimo 11 caracteres"),
  name: z.string().min(11, "A conta deve conter no mínimo 11 caracteres"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});
