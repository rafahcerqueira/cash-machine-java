import styled from "styled-components";
import { theme } from "@/theme";

export const InputSearchWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 3.4rem;
  display: flex;
  align-items: center;
  color: ${theme.colors.b2};
  border: 2px solid ${theme.colors.b2};
  border-radius: 0.5rem;
  padding: ${theme.spacing.paddings.input_search};
`;

export const InputSearchIcon = styled.span`
  font-size: ${theme.typography.fontSizes.input_search};
`;

export const InputSearchButton = styled.button`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  color: ${theme.colors.b2};
`;

export const InputSearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: ${theme.typography.fontSizes.input};
  font-weight: ${theme.typography.fontWeights.regular};
  padding: ${theme.spacing.paddings.input_search};
  color: ${theme.colors.b2};
  &::placeholder {
    color: ${theme.colors.b2};
  }
`;
