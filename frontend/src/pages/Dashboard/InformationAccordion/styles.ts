import styled from "styled-components";
import { theme } from "@/theme";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export const AccordionStyled = styled(Accordion)`
  background-color: ${theme.colors.p4} !important;
  border-radius: 0.6rem !important;
  position: static !important;

  .MuiAccordionSummary-root {
    border-radius: 0.6rem !important;
  }
`;

export const AccordionSummaryStyled = styled(AccordionSummary)`
  .MuiAccordionSummary-content {
    padding: 0.4rem;
    font-size: ${theme.typography.fontSizes.label};
    font-weight: ${theme.typography.fontWeights.regular};
    color: ${theme.colors.white};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.gaps.wrapper};

    span {
      font-size: ${theme.typography.fontSizes.title};
    }
  }
`;

export const ExpandIconStyled = styled.div`
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: ${theme.typography.fontSizes.title};
  }
`;

export const AccordionDetailsStyled = styled(AccordionDetails)`
  padding: 0.4rem;
  font-size: ${theme.typography.fontSizes.label};
  font-weight: ${theme.typography.fontWeights.regular};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.gaps.wrapper};
  background-color: ${theme.colors.p4};

  tr {
    width: 100%;
  }

  td {
    font-size: ${theme.typography.fontSizes.card_info};
    font-weight: ${theme.typography.fontWeights.regular};
    color: ${theme.colors.white};
    width: 25%;
    padding-left: 0.8rem;
  }
`;
