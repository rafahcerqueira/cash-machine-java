import styled from "styled-components";
import { theme } from "@/theme";

export const Paper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
`;

export const PaperOutlet = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.bg1};
  padding: 1rem 6rem;
`;
