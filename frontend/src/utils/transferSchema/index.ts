import { z } from "zod";

export const TransferSchema = z.object({
  accountNumberRecipient: z.string().min(9, "A conta deve conter 9 caracteres"),
  amount: z.number().min(1, "O valor deve ser maior que 0"),
});
