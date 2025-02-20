import styled from "styled-components";
import { theme } from "@/theme";

export const WrapperLogin = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.backgroundPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerLogin = styled.div`
  width: 100%;
  height: 36rem;
  margin: 0 20%;
  display: flex;
  z-index: 1;
  background-color: transparent;
  box-shadow: ${theme.boxShadow.cardLogin};
  border: 2vw solid ${theme.colors.backgroundPrimary};
`;

// Form
export const ContainerForm = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 6rem 4rem;
  color: ${theme.colors.black};

  @media (max-width: 1240px) {
    padding: ${theme.spacing.paddings.card};
  }
`;

export const WrapperTitle = styled.div`
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${theme.colors.p1_30};

    img {
      width: 8vw;
    }
  }

  h2 {
    font-size: ${theme.typography.fontSizes.title};
    font-weight: ${theme.typography.fontWeights.medium};
    line-height: ${theme.typography.lineHeights.title};
    padding: 2rem 0;
    color: ${theme.colors.p1_30};
  }

  @media (max-width: 1240px) {
    div {
      flex-direction: column;
      align-items: flex-start;
      img {
        width: 8rem;
      }
    }
  }
`;

export const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.gaps.default};
  gap: 1.2rem;
`;

export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  font-size: ${theme.typography.fontSizes.label};
  color: ${theme.colors.white};

  button {
    border: none;
    outline: none;
    cursor: pointer;
    font-size: ${theme.typography.fontSizes.label};
    font-weight: ${theme.typography.fontWeights.bold};
    background-color: transparent;
    color: ${theme.colors.white};
`;

export const WrapperPassword = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.gaps.wrapper};
  padding-bottom: 1rem;
`;

export const WrapperSelect = styled.div`
  display: flex;
  gap: 2rem;
`;

export const FixedStripe = styled.div`
  position: fixed;
  inset: 0 80% 0 22%;
  height: 100vh;
  width: 22.4%;
  background-color: ${theme.colors.backgroundSecondary};
`;
