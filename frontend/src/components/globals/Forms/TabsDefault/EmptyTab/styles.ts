import styled from "styled-components";
import { theme } from "@/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20rem;
  gap: ${theme.spacing.gaps.default};
  font-size: ${theme.typography.fontSizes.subtitle};
  color: ${theme.colors.p1};

  span {
    font-size: ${theme.typography.fontSizes.card_title};
  }
`;
