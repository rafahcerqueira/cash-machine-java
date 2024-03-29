import styled from "styled-components";
import { theme } from "@/theme";

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  gap: 3.6%;

  @media (max-width: 1280px) {
    gap: 2%;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CardContainer = styled.button`
  width: 100%;
  padding: ${theme.spacing.paddings.card_dashboard};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.gaps.wrapper};
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  box-shadow: ${theme.boxShadow.card};
  border: none;
  outline: none;
  cursor: pointer;

  p {
    font-size: ${theme.typography.fontSizes.card_title};
    font-weight: ${theme.typography.fontWeights.bold};
  }

  h2 {
    font-size: ${theme.typography.fontSizes.card_subtitle};
    font-weight: ${theme.typography.fontWeights.medium};
    text-align: center;
    min-height: 3.6rem;
  }
`;

export const IconWrapper = styled.div`
  padding: 1rem;
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${theme.colors.bg1};
  box-shadow: ${theme.boxShadow.card};
  color: ${theme.colors.p1};

  span {
    font-size: ${theme.typography.fontSizes.icon};
  }
`;

export const Percent = styled.div`
  font-size: ${theme.typography.fontSizes.card_info};
  font-weight: ${theme.typography.fontWeights.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  span {
    font-size: ${theme.typography.fontSizes.card_info};
  }
`;
