import styled from "styled-components";
import { theme } from "@/theme";

export const ContainerInfo = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 0 1rem 0;
  color: ${theme.colors.white};
`;

export const LogoImage = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 16rem;
    height: 16rem;
  }

  div {
    font-size: ${theme.typography.fontSizes.error};
    margin-top: 0.8rem;
    text-align: justify;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1240px) {
    img {
      width: 8rem;
      height: 8rem;
    }
  }
`;

export const WrapperDev = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${theme.typography.fontSizes.login_info};
  gap: 0.6rem;
  text-align: center;

  img {
    width: 8rem;
    height: auto;
  }

  @media (max-width: 1240px) {
    img {
      width: 6rem;
      height: auto;
    }
  }
`;
