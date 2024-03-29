import styled from "styled-components";
import { theme } from "@/theme";

export const InputSearchWrapper = styled.div`
  position: relative;
  width: 20rem;
  height: 3rem;
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.b2};
  border-radius: 0.2rem;
  padding: ${theme.spacing.paddings.input_search};
  fontSize: ${theme.typography.fontSizes.label},
  color: ${theme.colors.p1_30},
`;

export const InputSearchIcon = styled.span`
  font-size: 1.4rem;
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
  font-size: ${theme.typography.fontSizes.label};
  font-weight: ${theme.typography.fontWeights.regular};
  padding: ${theme.spacing.paddings.input_search};
  color: ${theme.colors.b2};
  &::placeholder {
    color: ${theme.colors.b2};
  }
`;
