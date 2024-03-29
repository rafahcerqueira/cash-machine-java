import { z } from "zod";

export const MaintenanceSchema = z.object({
  solicitante: z.string().min(1, "O campo Solicitante é obrigatório"),
  unidade: z.string().min(1, "O campo Unidade é obrigatório"),
  data: z.string().min(1, "O campo Data é obrigatório"),
  modelo: z.string().min(1, "O campo Modelo é obrigatório"),
  placa: z.string().min(1, "O campo Placa é obrigatório"),
  problema: z.string().min(1, "O campo Problema é obrigatório"),
  descricao: z.string().min(1, "O campo Descrição é obrigatório"),
});

export const MaintenanceCorrectiveSchema = z.object({
  solicitante: z.string().min(1, "O campo Solicitante é obrigatório"),
  unidade: z.string().min(1, "O campo Unidade é obrigatório"),
  classificacao: z.string().min(1, "O campo Classificação é obrigatório"),
  codigo_veiculo: z.string().min(1, "O campo Código do Veículo é obrigatório"),
  modelo: z.string().min(1, "O campo Modelo é obrigatório"),
  placa: z.string().min(1, "O campo Placa é obrigatório"),
  problema: z.string().min(1, "O campo Problema é obrigatório"),
  descricao: z.string().min(1, "O campo Descrição é obrigatório"),
});

export const MaintenanceProgressSchema = z.object({
  ordem_servico: z.string().min(1, "O campo Ordem de Serviço é obrigatório"),
  solicitante: z.string().min(1, "O campo Solicitante é obrigatório"),
  unidade: z.string().min(1, "O campo Unidade é obrigatório"),
  data: z.string().min(1, "O campo Data é obrigatório"),
  modelo: z.string().min(1, "O campo Modelo é obrigatório"),
  placa: z.string().min(1, "O campo Placa é obrigatório"),
  problema: z.string().min(1, "O campo Problema é obrigatório"),
  descricao: z.string().min(1, "O campo Descrição é obrigatório"),
});

export const steps = [
  {
    id: "Informações do Solicitante",
    fields: ["solicitante", "unidade", "data", "modelo", "placa"],
  },
  {
    id: "Informações da Manutenção",
    fields: ["problema", "descricao"],
  },
];
