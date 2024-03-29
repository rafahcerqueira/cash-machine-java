import styled from "styled-components";
import { theme } from "@/theme";

export const Wrapper = styled.div`
  gap: ${theme.spacing.gaps.wrapper};
  padding: 2rem 0;
  position: relative;
  margin-bottom: 2rem;
  width: 70%;
  min-width: 30rem;
`;

export const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.gaps.default};
`;

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
`;
