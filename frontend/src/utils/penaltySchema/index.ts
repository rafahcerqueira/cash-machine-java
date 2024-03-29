import { z } from "zod";

export const PenaltySchema = z.object({
  descricao: z.string().min(1, "O campo Descrição é obrigatório"),
  placa: z.string().min(1, "O campo Placa é obrigatório"),
  renainf: z.string().min(1, "O campo Renainf é obrigatório"),
  auto_infracao: z.string().min(1, "O campo Auto de Infração é obrigatório"),
  codigo_infracao: z
    .string()
    .min(1, "O campo Código de Infração é obrigatório"),
  orgao_autuador: z.string().min(1, "O campo Órgão Autuador é obrigatório"),
  orgao_competente: z.string().min(1, "O campo Órgão Competente é obrigatório"),
  local: z.string().min(1, "O campo Local é obrigatório"),
  data_cometimento: z
    .string()
    .min(1, "O campo Data de Cometimento é obrigatório"),
  data_notificacao_autuacao: z
    .string()
    .min(1, "O campo Data de Notificação da Autuação é obrigatório"),
  data_termino_defesa: z
    .string()
    .min(1, "O campo Data de Término da Defesa é obrigatório"),
  data_notificacao_penalidade: z
    .string()
    .min(1, "O campo Data de Notificação da Penalidade é obrigatório"),
  data_termino_recurso: z
    .string()
    .min(1, "O campo Data de Término do Recurso é obrigatório"),
  data_vencimento_desconto: z
    .string()
    .min(1, "O campo Data de Vencimento do Desconto é obrigatório"),
  data_pagamento: z.string().min(1, "O campo Data de Pagamento é obrigatório"),
  valor_pago: z.string().min(1, "O campo Valor Pago é obrigatório"),
  condutor_responsavel: z
    .string()
    .min(1, "O campo Condutor Responsável é obrigatório"),
  matricula: z.string().min(1, "O campo Matrícula é obrigatório"),
  veiculo: z.string().min(1, "O campo Veículo é obrigatório"),
  placa_veiculo: z.string().min(1, "O campo Placa do Veículo é obrigatório"),
  tipo_infracao: z.string().min(1, "O campo Tipo de Infração é obrigatório"),
  valor_infracao: z.string().min(1, "O campo Valor da Infração é obrigatório"),
  data_vencimento_pagamento: z
    .string()
    .min(1, "O campo Data de Vencimento do Pagamento é obrigatório"),
  data_cadastro: z.string().min(1, "O campo Data de Cadastro é obrigatório"),
});

export const steps = [
  {
    id: "Passo 1",
    fields: [
      "descricao",
      "placa",
      "renainf",
      "auto_infracao",
      "codigo_infracao",
      "orgao_autuador",
      "orgao_competente",
    ],
  },
  {
    id: "Passo 2",
    fields: [
      "local",
      "data_cometimento",
      "data_notificacao_autuacao",
      "data_termino_defesa",
      "data_notificacao_penalidade",
      "data_termino_recurso",
      "data_vencimento_desconto",
      "data_pagamento",
      "valor_pago",
    ],
  },
  {
    id: "Passo 3",
    fields: [
      "condutor_responsavel",
      "matricula",
      "veiculo",
      "placa_veiculo",
      "tipo_infracao",
      "valor_infracao",
      "data_vencimento_pagamento",
    ],
  },
];
