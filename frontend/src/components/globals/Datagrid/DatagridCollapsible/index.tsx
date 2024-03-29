import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

import {
  Container,
  ButtonView,
  WrapperHistory,
  InputRadioStyles,
  WrapperButton,
} from "./styles";
import { useNavigate } from "react-router-dom";
import ChipStatus from "./ChipStatus";
import { CustomNoRowsOverlay } from "../CustomNoRows";
import ButtonDefault from "../../Forms/ButtonDefault";
import { TablePagination } from "@mui/material";
import { theme } from "@/theme";
import { useNotification } from "@/hooks/Notification/useNotification";
import { GridColDef } from "@mui/x-data-grid";

type DatagridCollapsibleProps = {
  columns: any;
  rows: any;
};

type RowProps = {
  row: any;
};

enum Status {
  "EM ANDAMENTO" = "EM ANDAMENTO",
  "FINALIZAR OS" = "FINALIZAR OS",
  "CONCLUÍDO" = "CONCLUÍDO",
  "RECEBIDO" = "RECEBIDO",
  "APROVAÇÃO" = "APROVAÇÃO",
}

function Row({ row }: RowProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const notification = useNotification();

  const handleApprove = () => {
    if (!selected) {
      notification({
        severity: "warning",
        msg: "Selecione um histórico para aprovar",
      });
      return;
    }

    // [POST]
    console.log(`Vinculando orçamento ${row.id} à OS ${selected}`);
  };

  const handleNavigate = () => {
    let route;

    switch (row.status) {
      case Status["EM ANDAMENTO"]:
        route = `/manutencao/em-andamento/${row.id}`;
        break;
      case Status["FINALIZAR OS"]:
        route = `/manutencao/finalizar/${row.id}`;
        break;
      case Status["CONCLUÍDO"]:
        route = `/manutencao/${row.tipo}/${row.id}`;
        break;
      case Status["RECEBIDO"]:
        route = `/manutencao/${row.tipo}/${row.id}`;
        break;
      default:
        route = `/manutencao/${row.tipo}/${row.id}`;
        break;
    }

    navigate(route);
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {Object.keys(row).map((key) => {
          if (key === "historico" || key === "tipo") {
            return null;
          }
          return (
            <TableCell key={key} component="th" scope="row" align="center">
              {key === "status" ? (
                <ChipStatus status={row[key]} />
              ) : key === "buttonView" ? (
                <ButtonView onClick={() => handleNavigate()}>
                  <span className="material-symbols-outlined">{row[key]}</span>
                </ButtonView>
              ) : (
                row[key]
              )}
            </TableCell>
          );
        })}

        <TableCell align="right" width={5}>
          {row.status === Status["APROVAÇÃO"] && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <span className="material-symbols-outlined">expand_less</span>
              ) : (
                <span className="material-symbols-outlined">expand_more</span>
              )}
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.historico.length > 0 ? (
                <WrapperHistory>
                  {row.historico.map(
                    (historyRow: {
                      id: string;
                      nome: string;
                      valor: number;
                    }) => (
                      <InputRadioStyles key={historyRow.id}>
                        <input
                          type="radio"
                          id={historyRow.id}
                          name="historico"
                          checked={selected === historyRow.id}
                          onChange={() => setSelected(historyRow.id)}
                        />
                        <label htmlFor={historyRow.id}>
                          <div>{historyRow.nome}</div>
                          <p></p>
                          <span>
                            {`R$ ${historyRow.valor.toLocaleString("pt-br", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}
                          </span>
                        </label>
                      </InputRadioStyles>
                    )
                  )}
                  <WrapperButton>
                    <ButtonDefault
                      variant="contained"
                      color="secondary"
                      type="button"
                      text="Aprovar"
                      onClick={() => handleApprove()}
                      styles={{
                        width: "10rem",
                        height: "2.5rem",
                        color: theme.colors.p2,
                        fontSize: theme.typography.fontSizes.button_add,
                      }}
                    />
                  </WrapperButton>
                </WrapperHistory>
              ) : (
                <CustomNoRowsOverlay />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function DatagridCollapsible({
  columns,
  rows,
}: DatagridCollapsibleProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDisplayedRows = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return rows.slice(startIndex, endIndex);
  };

  return (
    <Container>
      <Table
        aria-label="collapsible table"
        style={{
          fontFamily: "sans-serif",
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column: GridColDef) => (
              <TableCell
                key={column.field}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.headerName}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        {rows.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <CustomNoRowsOverlay />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {getDisplayedRows().map(
              (row: {
                id: string;
                modelo: string;
                placa: string;
                solicitante: string;
                historico: { id: string; nome: string; valor: number }[];
                status: string;
                buttonView: string;
              }) => (
                <Row key={row.id} row={row} />
              )
            )}
          </TableBody>
        )}
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
