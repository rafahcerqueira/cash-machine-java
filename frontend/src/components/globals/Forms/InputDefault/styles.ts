import styled from "styled-components";
import { theme } from "@/theme";

import { TextField } from "@mui/material";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 47%;
`;

export const WrapperTextField = styled(TextField)`
  width: 100%;
`;

export const WrapperError = styled.div`
  color: ${theme.colors.p4};
  font-size: ${theme.typography.fontSizes.error};
  height: 0.3rem;
`;
