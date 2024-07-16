import styled from "styled-components";
import { theme } from "@/theme";

export const TitleWrapper = styled.header`
  display: flex;
  justify-content: left;
  align-items: center;
  text-decoration: none;
  padding: 1rem 0 2rem;
  gap: 0.8rem;
`;

export const TitleDetail = styled.div`
  width: 0.5rem;
  height: 1.3rem;
  border-radius: 0.5rem;
  background: ${theme.colors.bg2};
`;

export const TitleText = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.title};
  font-weight: ${theme.typography.fontWeights.bold};
  text-align: center;
  letter-spacing: 0.05rem;
`;
