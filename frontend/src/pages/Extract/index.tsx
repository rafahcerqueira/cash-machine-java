import { Wrapper, Container } from "./styles";
import HeaderTitle from "@/components/globals/Layout/HeaderTitle";
import DatagridDefault from "@/components/globals/Datagrid/DatagridDefault";
import CircularLoading from "@/components/globals/Loading";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import axios from "@/api/axios";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
}

export default function Extract() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getExtract = async () => {
    try {
      const response = await axios.get(`/api/transactions/${user?.id}`);
      const data = response.data.map((transaction: any) => ({
        id: transaction.id,
        type: transaction.type === "DEPOSIT" ? "Depósito" : "Saque",
        amount: transaction.amount,
        date: dayjs(transaction.date).format("YYYY-MM-DD HH:mm:ss"),
      }));
      setRows(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "CÓDIGO",
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
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <span>
          {dayjs(params.value as string, "YYYY-MM-DD").format("DD/MM/YYYY")}
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (user?.id) {
      getExtract();
    }
  }, [user?.id]);

  return (
    <Wrapper>
      <HeaderTitle>EXTRATO</HeaderTitle>
      <Container>
        {loading ? (
          <CircularLoading />
        ) : (
          <DatagridDefault columns={columns} rows={rows} />
        )}
      </Container>
    </Wrapper>
  );
}
