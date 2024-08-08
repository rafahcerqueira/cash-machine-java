import { DataGrid, GridSortModel, GridToolbar, ptBR } from "@mui/x-data-grid";
import { DatagridStyles } from "@/theme/defaultStyles";
import { Container } from "./styles";
import { CustomNoRowsOverlay } from "../CustomNoRows";

type DatagridDefaultProps = {
  columns: any;
  rows: any;
  sortModel: GridSortModel;
};

export default function DatagridDefault({
  columns,
  rows,
  sortModel,
}: DatagridDefaultProps) {
  return (
    <Container>
      <div style={{ height: rows.length > 0 ? "100%" : 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          sx={DatagridStyles}
          pageSizeOptions={[5, 10, 20, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          sortModel={sortModel}
        />
      </div>
    </Container>
  );
}
