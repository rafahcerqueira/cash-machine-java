import styled from "styled-components";
import { theme } from "@/theme";

export const TitleWrapper = styled.header`
  display: flex;
  justify-content: left;
  align-items: center;
  text-decoration: none;
  padding: 0 0 2rem;
  gap: 0.8rem;
  width: 100%;
`;

export const TitleDetail = styled.div`
  width: 0.5rem;
  height: 1.3rem;
  border-radius: 0.5rem;
`;

export const TitleText = styled.span`
  letter-spacing: 0.05rem;
  text-align: center;
  color: ${theme.colors.p1};
  font-size: ${theme.typography.fontSizes.subtitle};
  font-weight: ${theme.typography.fontWeights.bold};
`;
