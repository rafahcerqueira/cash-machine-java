import { z } from "zod";

export const maintenanceFinishSchema = z.object({
  nome: z.string().min(1, "O campo Nome é obrigatório"),
  unidade: z.string().min(1, "O campo Unidade é obrigatório"),
  modelo: z.string().min(1, "O campo Modelo é obrigatório"),
  data: z.string().min(1, "O campo Data é obrigatório"),
  placa: z.string().min(1, "O campo Placa é obrigatório"),
  problema: z.string().min(1, "O campo Problema é obrigatório"),
  descricao: z.string().min(1, "O campo Descrição é obrigatório"),
  laudo: z.string().min(1, "O campo Laudo é obrigatório"),
  valor: z.string().min(1, "O campo Valor é obrigatório"),
});

export const steps = [
  {
    id: "Informações da Oficina",
    fields: ["nome", "unidade", "modelo", "data", "placa"],
  },
  {
    id: "Informações da Manutenção",
    fields: ["problema", "descricao", "laudo", "valor"],
  },
];
