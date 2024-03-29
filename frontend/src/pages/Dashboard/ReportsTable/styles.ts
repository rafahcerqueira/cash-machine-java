import styled from "styled-components";
import { theme } from "@/theme";

export const WrapperPaper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${theme.spacing.paddings.paper};
  border-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadow.card};
`;

export const HeaderStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
