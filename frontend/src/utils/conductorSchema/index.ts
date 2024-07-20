import { z } from "zod";

export const ConductorSchema = z.object({
  nome_completo: z.string().min(1, "O campo Nome Completo é obrigatório"),
  conta: z.string().min(1, "O campo conta é obrigatório"),
  nascimento: z.string().min(1, "O campo Nascimento é obrigatório"),
  cargo: z.string().min(1, "O campo Cargo é obrigatório"),
  cep: z.string().min(1, "O campo CEP é obrigatório"),
  cidade: z.string().min(1, "O campo Cidade é obrigatório"),
  estado: z.string().min(1, "O campo Estado é obrigatório"),
  endereco: z.string().min(1, "O campo Endereço é obrigatório"),
  numero: z.string().min(1, "O campo Número é obrigatório"),
  contato: z.string().min(1, "O campo Contato é obrigatório"),
  email: z.string().min(1, "O campo E-mail é obrigatório"),
  cnh: z.string().min(1, "O campo CNH é obrigatório"),
  categoria: z.string().min(1, "O campo Categoria é obrigatório"),
  orgao_expedidor: z.string().min(1, "O campo Órgão Expedidor é obrigatório"),
  emissao: z.string().min(1, "O campo Emissão é obrigatório"),
  validade: z.string().min(1, "O campo Validade é obrigatório"),
});

export const steps = [
  {
    id: "Dados Pessoais",
    fields: [
      "nome_completo",
      "conta",
      "nascimento",
      "cargo",
      "cep",
      "cidade",
      "estado",
      "endereco",
      "numero",
      "contato",
      "email",
    ],
  },
  {
    id: "Dados da CNH",
    fields: ["cnh", "categoria", "orgao_expedidor", "emissao", "validade"],
  },
];
