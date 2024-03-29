import { useEffect, useState } from "react";
import { WrapperPaper, HeaderStyled } from "./styles";
import SimpleTitle from "@/components/globals/Layout/SimpleTitle";
import DatagridLight from "@/components/globals/Datagrid/DatagridLight";
import { GridColDef } from "@mui/x-data-grid";
import { DataReportsProps } from "..";
import dayjs from "dayjs";
import SelectDefault from "@/components/globals/Forms/SelectDefault";

const OptionSelect = [
  {
    value: 6,
    label: "Último 6 meses",
  },
  {
    value: 12,
    label: "Último 12 meses",
  },
];

type ReportTableProps = {
  dataReports?: DataReportsProps;
};

export default function ReportsTable({ dataReports }: ReportTableProps) {
  const [SelectValue, setSelectValue] = useState<number>(6);
  const [dataTripFiltered, setDataTripFiltered] = useState<DataReportsProps>();

  const columns: GridColDef[] = [
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
    {
      field: "id",
      headerName: "CÓD. VEÍCULO",
      headerClassName: "theme-header",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "unidade",
      headerName: "UNIDADE",
      headerClassName: "theme-header",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "status",
      headerName: "STATUS",
      headerClassName: "theme-header",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "descricao",
      headerName: "DESCRIÇÃO",
      headerClassName: "theme-header",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
    },
  ];

  useEffect(() => {
    if (!SelectValue) return setDataTripFiltered(dataReports);

    if (dataReports && dataReports.length > 0) {
      const currentDate = dayjs();
      const lastMonthsDate = currentDate.subtract(SelectValue, "month");

      // Filtra os dados com base no intervalo de datas
      const filteredData = dataReports.filter((item) =>
        dayjs(item.data, "YYYY/MM/DD").isAfter(lastMonthsDate)
      );

      setDataTripFiltered(filteredData);
    }
  }, [SelectValue, dataReports]);

  return (
    <WrapperPaper>
      <HeaderStyled>
        <SimpleTitle>RELATÓRIOS</SimpleTitle>
        <SelectDefault
          state={SelectValue}
          setState={setSelectValue}
          label="Período"
          options={OptionSelect}
        />
      </HeaderStyled>
      <DatagridLight
        columns={columns}
        rows={dataTripFiltered || dataReports || []}
      />
    </WrapperPaper>
  );
}
