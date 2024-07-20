import styled, { keyframes } from "styled-components";
import { theme } from "@/theme";

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.gaps.wrapper};
  padding-bottom: 1rem;
  position: relative;
  margin-bottom: 2rem;
`;

export const StepLine = styled.div`
  height: 0.1rem;
  width: 10rem;
  background: ${theme.colors.b2};
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 100%;
  animation: ${scaleIn} 0.2s ease-in-out;
`;

export const StepNumber = styled(Step)`
  color: ${theme.colors.b2};
  background: ${theme.colors.backgroundPrimary};
  border: 1px solid ${theme.colors.b2};
`;

export const StepIcon = styled(Step)`
  transition: all 0.3s ease-in-out;
  color: ${theme.colors.bg1};
  background: ${theme.colors.p1};
  border: 1px solid ${theme.colors.bg1};
`;
