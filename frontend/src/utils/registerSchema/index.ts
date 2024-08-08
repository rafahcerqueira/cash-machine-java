import { AccountLevel } from "@/enums/AccountLevel";
import { AccountType } from "@/enums/AccountType";
import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "O nome não pode ser vazio"),
    accountType: z.nativeEnum(AccountType),
    accountLevel: z.nativeEnum(AccountLevel),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });
