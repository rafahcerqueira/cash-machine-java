import { CardWrapper, CardContainer } from "./styles";
import { useAuth } from "@/hooks";
import { theme } from "@/theme";

export default function Cards() {
  const { user } = useAuth();

  return (
    <CardWrapper>
      <CardContainer>
        <h2>Daniel Toledo</h2>
        <p>00495311-6</p>
      </CardContainer>
      <CardContainer>
        <h2>Saldo</h2>
        <p style={{ color: theme.colors.p2 }}>R$ 1.000,00</p>
      </CardContainer>
    </CardWrapper>
  );
}
