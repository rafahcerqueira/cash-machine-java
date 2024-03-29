import { theme } from "@/theme";
import { TitleWrapper, TitleDetail, TitleText } from "./styles";

type SimpleTitleProps = {
  children: string | string[];
  color?: string;
};

export default function SimpleTitle({ children, color }: SimpleTitleProps) {
  return (
    <TitleWrapper>
      <TitleDetail
        style={
          color
            ? { backgroundColor: color }
            : { backgroundColor: theme.colors.p1 }
        }
      />
      <TitleText>{children}</TitleText>
    </TitleWrapper>
  );
}
