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

const typeTransactions: { [key: string]: string } = {
  WITHDRAW: "Saque",
  DEPOSIT: "Depósito",
  TRANSFER: "Transferência",
  RECEIVE_TRANSFER: "Recebimento de Transferência",
};

export default function Extract() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getExtract = async () => {
    try {
      const response = await axios.get(`/api/transactions/${user?.id}`);

      const data = response.data.map((transaction: any) => {
        // Converte o array de data para um formato de data válido
        const [year, month, day, hour, minute, second] = transaction.date;
        const date = dayjs(
          new Date(year, month - 1, day, hour, minute, second)
        ).format("YYYY-MM-DD HH:mm:ss");

        return {
          id: transaction.id,
          type: typeTransactions[transaction.type] || "Outro",
          amount: transaction.amount,
          date: date,
        };
      });

      setRows(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
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
      field: "date",
      headerName: "DATA",
      headerClassName: "theme-header",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: true,
      disableColumnMenu: true,
      sortComparator: (a, b) => {
        return dayjs(b).isAfter(dayjs(a)) ? 1 : -1;
      },
      renderCell: (params) => (
        <span>
          {dayjs(params.value as string, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
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
          <DatagridDefault
            columns={columns}
            rows={rows}
            sortModel={[{ field: "date", sort: "asc" }]}
          />
        )}
      </Container>
    </Wrapper>
  );
}
