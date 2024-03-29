import styled from "styled-components";
import { theme } from "@/theme";

export const SidebarWrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  width: 15rem;
  min-width: 15rem;
  height: 100vh;
  transition: transform 0.3s ease-in-out;
  background: ${theme.colors.backgroundSecondary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SidebarBody = styled.div`
  overflow: hidden;
`;

export const UnorderList = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  display: block;
  transition: all 0.5s ease;
`;

export const LogoutButton = styled.button`
  position: relative;
  background: transparent;
  padding: 15px 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.gaps.wrapper};
  border: none;
  border-top: 1px solid ${theme.colors.primary};
  cursor: pointer;
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.sidebar};
  font-weight: ${theme.typography.fontWeights.regular};
  &:hover {
    background-color: #ffffff24;
  }
`;
