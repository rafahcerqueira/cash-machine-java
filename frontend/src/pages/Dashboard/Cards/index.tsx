import { CardWrapper, CardContainer, IconWrapper, Percent } from "./styles";
import { theme } from "@/theme";

type CardsType = {
  dataCards: {
    title: string;
    icon: string;
    value: number;
    percent: number;
  }[];
  CardActive: number;
  setCardActive: React.Dispatch<React.SetStateAction<number>>;
};

export default function Cards({
  dataCards,
  CardActive,
  setCardActive,
}: CardsType) {
  return (
    <CardWrapper>
      {dataCards.map((card, index) => (
        <CardContainer
          key={index}
          onClick={() => setCardActive(index)}
          style={
            index === CardActive
              ? {
                  background: theme.colors.g2,
                  color: theme.colors.white,
                }
              : {
                  background: theme.colors.white,
                  color: theme.colors.p1,
                }
          }
        >
          <IconWrapper>
            <span className="material-symbols-outlined">{card.icon}</span>
          </IconWrapper>
          <p>{card.value}</p>
          <h2>{card.title}</h2>
          <Percent
            style={
              index === CardActive
                ? { color: theme.colors.white }
                : { color: theme.colors.p1_50 }
            }
          >
            <span className="material-symbols-outlined">
              {card.percent > 0 ? "north" : "south"}
            </span>
            {(card.percent < 0 ? card.percent * -1 : card.percent).toFixed(2)}%
          </Percent>
        </CardContainer>
      ))}
    </CardWrapper>
  );
}
