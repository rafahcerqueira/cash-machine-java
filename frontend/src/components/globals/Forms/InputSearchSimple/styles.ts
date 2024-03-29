import styled from "styled-components";
import { theme } from "@/theme";

export const InputSearchSimpleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2.4rem;
  display: flex;
  align-items: center;
  color: ${theme.colors.b2};
  border-bottom: 2px solid ${theme.colors.b2};
  padding: ${theme.spacing.paddings.input_search};
`;

export const InputSearchSimpleIcon = styled.span`
  font-size: ${theme.typography.fontSizes.input};
`;

export const InputSearchSimpleButton = styled.button`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  color: ${theme.colors.b2};
`;

export const InputSearchSimpleInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: ${theme.typography.fontSizes.input_search_simple};
  font-weight: ${theme.typography.fontWeights.regular};
  padding: ${theme.spacing.paddings.input_search};
  color: ${theme.colors.b2};

  &::placeholder {
    color: ${theme.colors.b2};
    f
  }
`;
