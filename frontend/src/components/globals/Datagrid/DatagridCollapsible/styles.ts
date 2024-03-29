import styled from "styled-components";
import { theme } from "@/theme";
import TableContainer from "@mui/material/TableContainer";

export const Container = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-height: 12rem;
  border: 1px solid ${theme.colors.p1_30};
  border-radius: 0.4rem;
  color: ${theme.colors.p1};

  thead {
    margin: 0;
    background-color: ${theme.colors.bg3};

    th {
      color: ${theme.colors.p1};
      font-size: ${theme.typography.fontSizes.header_datagrid};
      font-weight: ${theme.typography.fontWeights.medium};
    }
  }

  tbody {
    th {
      color: ${theme.colors.p1};
      font-size: ${theme.typography.fontSizes.cell_datagrid};
      font-weight: 500;
    }
  }
`;

export const ButtonView = styled.button`
  color: ${theme.colors.p1_50};
  background-color: transparent;
  cursor: pointer;
  margin: 0 auto;
  border: none;

  span {
    font-size: ${theme.typography.fontSizes.icon};
  }
`;

export const WrapperHistory = styled.div`
  width: 98%;
  padding: 0.2rem 0 0.6rem;
`;

export const InputRadioStyles = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0 1rem 3.4rem;
  font-size: ${theme.typography.fontSizes.cell_datagrid};

  input {
    margin-right: 1rem;
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    accent-color: ${theme.colors.p1};
  }

  label {
    margin: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  div {
    width: 20%;
  }

  p {
    width: 65%;
    border-top: 1px dashed ${theme.colors.p1_30};
  }

  span {
    width: 15%;
    display: flex;
    justify-content: flex-end;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
