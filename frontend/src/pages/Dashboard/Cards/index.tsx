import { CardWrapper, CardContainer } from "./styles";
import { useAuth } from "@/hooks";
import { theme } from "@/theme";

export default function Cards() {
  const { user } = useAuth();

  return (
    <CardWrapper>
      <CardContainer>
        <h2>{user?.name}</h2>
        <p>{user?.account.accountNumber}</p>
      </CardContainer>
      <CardContainer>
        <h2>Saldo</h2>
        <p style={{ color: theme.colors.p2 }}>R$ {user?.account.balance}</p>
      </CardContainer>
      <CardContainer>
        <h2>Tipo de Conta</h2>
        <p style={{ color: theme.colors.primary }}>{user?.account.type}</p>
      </CardContainer>
      <CardContainer>
        <h2>Level</h2>
        <p style={{ color: theme.colors.primary }}>{user?.account.level}</p>
      </CardContainer>
    </CardWrapper>
  );
}
