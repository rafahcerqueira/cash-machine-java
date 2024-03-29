import { z } from "zod";

export const VehicleSchema = z.object({
  unidade: z.string().min(1, "O campo Unidade é obrigatório"),
  renavam: z.string().min(1, "O campo Renavam é obrigatório"),
  placa: z.string().min(1, "O campo Placa é obrigatório"),
  exercicio: z.string().min(1, "O campo Exercício é obrigatório"),
  fabricacao: z.string().min(1, "O campo Fabricação é obrigatório"),
  modelo: z.string().min(1, "O campo Modelo é obrigatório"),
  crv: z.string().min(1, "O campo CRV é obrigatório"),
  cla: z.string().min(1, "O campo CLA é obrigatório"),
  marca_modelo: z.string().min(1, "O campo Marca/Modelo é obrigatório"),
  especie_tipo: z.string().min(1, "O campo Espécie/Tipo é obrigatório"),
  chassi: z.string().min(1, "O campo Chassi é obrigatório"),
  cor_predominante: z.string().min(1, "O campo Cor predominante é obrigatório"),
  combustivel: z.string().min(1, "O campo Combustível é obrigatório"),
  categoria: z.string().min(1, "O campo Categoria é obrigatório"),
  potencia_cilindrada: z
    .string()
    .min(1, "O campo Potência/Cilindrada é obrigatório"),
  motor: z.string().min(1, "O campo Motor é obrigatório"),
  lotacao: z.string().min(1, "O campo Lotação é obrigatório"),
  nome: z.string().min(1, "O campo Nome é obrigatório"),
  cnpj: z.string().min(1, "O campo CNPJ é obrigatório"),
  local: z.string().min(1, "O campo Local é obrigatório"),
  data: z.string().min(1, "O campo Data é obrigatório"),
});

export const steps = [
  {
    id: "form 1",
    fields: [
      "unidade",
      "renavam",
      "placa",
      "exercicio",
      "fabricacao",
      "modelo",
      "crv",
    ],
  },
  {
    id: "form 2",
    fields: [
      "cla",
      "marca_modelo",
      "especie_tipo",
      "chassi",
      "cor_predominante",
      "combustivel",
    ],
  },
  {
    id: "form 3",
    fields: [
      "categoria",
      "potencia_cilindrada",
      "motor",
      "lotacao",
      "nome",
      "cnpj",
      "local",
      "data",
    ],
  },
];
