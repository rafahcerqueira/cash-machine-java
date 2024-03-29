import styled from "styled-components";
import { theme } from "@/theme";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 5vh;
  text-decoration: none;
`;

export const HeaderTitle = styled.span`
  color: ${theme.colors.p1};
  font-size: ${theme.typography.fontSizes.button};
  font-weight: ${theme.typography.fontWeights.medium};
  text-align: center;
`;

export const HeaderLink = styled.button`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export const HeaderIcon = styled.span`
  color: ${theme.colors.p1};
  font-size: ${theme.typography.fontSizes.sidebar};
`;
