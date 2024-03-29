import { useEffect, useState } from "react";
import { Wrapper, Container, ChartContainer } from "./styles";

import HeaderTitle from "@/components/globals/Layout/HeaderTitle";
import Cards from "./Cards";
import InformationAccordion from "./InformationAccordion";
import PieChart from "./PieChart";
import BarsChart from "./BarsChart";
import ReportsTable from "./ReportsTable";

const DataCards = [
  {
    title: "Veículos Cadastrados",
    icon: "directions_car",
    value: 120,
    percent: 50.0,
  },
  {
    title: "Condutores Cadastrados",
    icon: "search_hands_free",
    value: 60,
    percent: 28.0,
  },
  {
    title: "Veículos em Manutenção",
    icon: "tv_options_input_settings",
    value: 4,
    percent: -8.0,
  },
  {
    title: "Oficinas Cadastradas",
    icon: "description",
    value: 26,
    percent: 32.0,
  },
  {
    title: "Solicitações de Manutenção",
    icon: "notifications_unread",
    value: 3,
    percent: 10.0,
  },
];

const ExampleDataInfo = {
  type: "error",
  total: 6,
  title: "veículos com excessivo número de viagens offline",
  description: [
    {
      id: "COD-001",
      name: "Marco Aurélio Del Nero",
      validade_cnh: "2025-12-15",
      total: 6,
    },
    {
      id: "COD-002",
      name: "João Paulo Barreto Santos",
      validade_cnh: "2027-06-01",
      total: 9,
    },
  ],
};

const ExampleDataFinance = [
  { value: 750000, label: `Valor Disponível | R$ 750.000,00 ` },
  { value: 250000, label: `Valor Gasto | R$ 250.000,00 ` },
];

const ExampleDataTrip = [
  {
    month: "JAN",
    online: 2,
    offline: 3,
  },
  {
    month: "FEV",
    online: 6,
    offline: 7,
  },
  {
    month: "MAR",
    online: 13,
    offline: 2,
  },
  {
    month: "ABR",
    online: 2,
    offline: 2,
  },
  {
    month: "MAI",
    online: 10,
    offline: 14,
  },
  {
    month: "JUN",
    online: 12,
    offline: 8,
  },
  {
    month: "JUL",
    online: 2,
    offline: 12,
  },
  {
    month: "AGO",
    online: 6,
    offline: 4,
  },
  {
    month: "SET",
    online: 14,
    offline: 22,
  },
  {
    month: "OUT",
    online: 31,
    offline: 12,
  },
  {
    month: "NOV",
    online: 8,
    offline: 13,
  },
  {
    month: "DEZ",
    online: 12,
    offline: 12,
  },
];

const ExampleDataReports = [
  {
    data: "2023-10-15",
    id: "COD-001",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-10-15",
    id: "COD-002",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-10-15",
    id: "COD-003",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-10-15",
    id: "COD-004",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-10-15",
    id: "COD-005",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-10-15",
    id: "COD-006",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-02-15",
    id: "COD-007",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-02-15",
    id: "COD-008",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-02-15",
    id: "COD-009",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-02-15",
    id: "COD-010",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-02-15",
    id: "COD-011",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
  {
    data: "2023-02-15",
    id: "COD-012",
    unidade: "CBM-SE",
    status: "EM VIAGEM",
    descricao: "Descrição da viagem",
  },
];

export type DataInfoProps = {
  type: string;
  total: number;
  title: string;
  description: {
    id: string;
    name: string;
    validade_cnh: string;
    total: number;
  }[];
};

export type DataFinanceProps = {
  value: number;
  label: string;
}[];

export type DataTripProps = {
  month: string;
  online: number;
  offline: number;
}[];

export type DataReportsProps = {
  data: string;
  id: string;
  unidade: string;
  status: string;
  descricao: string;
}[];

export default function Dashboard() {
  const [CardActive, setCardActive] = useState(1);
  const [DataInfo, setDataInfo] = useState<DataInfoProps>();
  const [DataFinance, setDataFinance] = useState<DataFinanceProps>();
  const [DataTrip, setDataTrip] = useState<DataTripProps>();
  const [DataReports, setDataReports] = useState<DataReportsProps>();

  useEffect(() => {
    // [GET]
    setDataInfo(ExampleDataInfo);
    setDataFinance(ExampleDataFinance);
    setDataTrip(ExampleDataTrip);
    setDataReports(ExampleDataReports);
  }, [CardActive]);

  return (
    <Wrapper>
      <HeaderTitle>TELA INICIAL</HeaderTitle>
      <Container>
        <Cards
          dataCards={DataCards}
          CardActive={CardActive}
          setCardActive={setCardActive}
        />
        {DataInfo && <InformationAccordion dataInfo={DataInfo} />}
        <ChartContainer>
          <BarsChart dataTrip={DataTrip} />
          <PieChart dataFinance={DataFinance} />
        </ChartContainer>
        <ReportsTable dataReports={DataReports} />
      </Container>
    </Wrapper>
  );
}
