import styled from "styled-components";
import { theme } from "@/theme";

export const Wrapper = styled.section`
  height: 100%;
  padding-bottom: 2rem;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.gaps.default};
`;
