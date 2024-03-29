import styled from "styled-components";
import { theme } from "@/theme";

export const Wrapper = styled.section`
  height: 100%;
  padding-bottom: 2rem;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.gaps.default};
`;

export const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.64fr;
  grid-template-rows: 28rem;
  gap: 3rem;
`;
