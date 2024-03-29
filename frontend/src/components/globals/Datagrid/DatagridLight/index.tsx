import { DataGrid, ptBR } from "@mui/x-data-grid";
import { DatagridLightStyles } from "@/theme/defaultStyles";
import { Container } from "./styles";
import { CustomNoRowsOverlay } from "../CustomNoRows";

type DatagridLightProps = {
  columns: any;
  rows: any;
};

export default function DatagridLight({ columns, rows }: DatagridLightProps) {
  return (
    <Container>
      <div style={{ height: rows.length > 0 ? "100%" : 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          sx={DatagridLightStyles}
          pageSizeOptions={[5, 10, 20, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Container>
  );
}
