import styled from "styled-components";
import { theme } from "@/theme";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export const StyledTabs = styled(Tabs)`
  & .MuiTabs-flexContainer {
    justify-content: space-between;
  }
`;

export const StyledTab = styled(Tab)`
  font-size: ${theme.typography.fontSizes.label} !important;
  font-weight: ${theme.typography.fontWeights.regular} !important;
  min-width: 46% !important;
  border-bottom: 1px ${theme.colors.b3} solid !important;
`;
