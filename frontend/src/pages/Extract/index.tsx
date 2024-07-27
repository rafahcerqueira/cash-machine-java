import { Wrapper, Container } from "./styles";
import HeaderTitle from "@/components/globals/Layout/HeaderTitle";
import DatagridDefault from "@/components/globals/Datagrid/DatagridDefault";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

const rows = [
  {
    id: 1,
    type: "Depósito",
    amount: 1000,
    data: "2024-07-22",
  },
  {
    id: 2,
    type: "Saque",
    amount: 500,
    data: "2024-07-24",
  },
  {
    id: 3,
    type: "Depósito",
    amount: 1000,
    data: "2024-07-26",
  },
];

export default function Extract() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "CÓD. OPERAÇÃO",
      headerClassName: "theme-header",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "type",
      headerName: "TIPO",
      headerClassName: "theme-header",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "amount",
      headerName: "VALOR",
      headerClassName: "theme-header",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <span>
          R${" "}
          {Number(params.value as number).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      field: "data",
      headerName: "DATA",
      headerClassName: "theme-header",
      width: 200,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <span>{dayjs(params.value as string).format("DD/MM/YYYY")}</span>
      ),
    },
  ];
  return (
    <Wrapper>
      <HeaderTitle>EXTRATO</HeaderTitle>
      <Container>
        <DatagridDefault columns={columns} rows={rows} />
      </Container>
    </Wrapper>
  );
}
