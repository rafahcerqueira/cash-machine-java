import { TitleWrapper, TitleDetail, TitleText } from "./styles";

type HeaderTitleProps = {
  children: string | string[];
};

export default function HeaderTitle({ children }: HeaderTitleProps) {
  return (
    <TitleWrapper>
      <TitleDetail />
      <TitleText>{children}</TitleText>
    </TitleWrapper>
  );
}
