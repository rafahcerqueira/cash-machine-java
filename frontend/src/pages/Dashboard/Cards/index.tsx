import axios from "@/api/axios";
import { CardWrapper, CardContainer } from "./styles";
import { useAuth } from "@/hooks";
import { theme } from "@/theme";
import { useEffect, useState } from "react";

const levelColors = {
  OURO: "#FFD700",
  PRATA: "#C0C0C0",
  BRONZE: "#CD7F32",
} as const;

export default function Cards() {
  const { user } = useAuth();
  const [userResponse, setUserResponse] = useState<any>(null);

  const getUser = async () => {
    try {
      const response = await axios.get("/api/user/" + user?.id);
      setUserResponse(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const getLevelColor = (level: string | undefined) => {
    return levelColors[level as keyof typeof levelColors] || theme.colors.p1_50;
  };

  useEffect(() => {
    if (user?.id) {
      getUser();
    }
  }, [user?.id]);

  const currentUser = userResponse || user;

  return (
    <CardWrapper>
      <CardContainer>
        <h2>{currentUser?.name}</h2>
        <p>{currentUser?.account?.accountNumber}</p>
      </CardContainer>
      <CardContainer>
        <h2>Saldo</h2>
        <p style={{ color: theme.colors.p2 }}>
          R${" "}
          {currentUser?.account?.balance.toLocaleString("pt-br", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </CardContainer>
      <CardContainer>
        <h2>Tipo de Conta</h2>
        <p style={{ color: theme.colors.primary }}>
          {currentUser?.account?.type}
        </p>
      </CardContainer>
      <CardContainer>
        <h2>Level</h2>
        <p style={{ color: getLevelColor(currentUser?.account?.level) }}>
          {currentUser?.account?.level}
        </p>
      </CardContainer>
    </CardWrapper>
  );
}
