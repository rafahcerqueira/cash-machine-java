import styled from "styled-components";
import { theme } from "@/theme";

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: 12% 2%;

  @media (max-width: 1280px) {
    gap: 2%;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacing.paddings.card};
  border-radius: 0.4rem;
  box-shadow: ${theme.boxShadow.card};
  transition: all 0.3s;
  background-color: ${theme.colors.backgroundSecondary};
  color: ${theme.colors.white};

  h2 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
`;
