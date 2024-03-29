import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/theme";

export const NavLinks = styled(NavLink)`
  position: relative;
  padding: 8px 32px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: left;
  border: 1px solid ${theme.colors.backgroundPrimary};
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.sidebar};
  font-weight: ${theme.typography.fontWeights.regular};
  &:hover {
    background-color: #ffffff24;
  }
  &.active {
    border-right: 14px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    transition: all 0.4s ease;
  }
`;

export const Icon = styled.div`
  margin-right: 10px;
  font-size: ${theme.typography.fontSizes.icon};
`;
