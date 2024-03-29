import { HighlightScope, useDrawingArea } from "@mui/x-charts";
import { WrapperPaper, PieChartStyled } from "./styles";
import SimpleTitle from "@/components/globals/Layout/SimpleTitle";
import { styled } from "@mui/material/styles";
import { theme } from "@/theme";
import { DataFinanceProps } from "..";

type PieChartProps = {
  dataFinance?: DataFinanceProps;
};

const StyledText = styled("text")(() => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 40,
  fontWeight: "bold",
  color: theme.colors.p1,
}));

const StyledInfoText = styled("text")(() => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 10,
  fontWeight: "400",
  color: theme.colors.p1_50,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <StyledText x={left + width / 2} y={top + (height / 2) * 0.85}>
        {children}
      </StyledText>
      <StyledInfoText x={left + width / 2} y={top + (height / 2) * 1.2}>
        DO VALOR GASTO
      </StyledInfoText>
    </>
  );
}

export default function PieChart({ dataFinance }: PieChartProps) {
  return (
    <WrapperPaper>
      <SimpleTitle>FINANCEIRO</SimpleTitle>
      <PieChartStyled
        colors={[theme.colors.p2, theme.colors.g2]}
        margin={{ top: 20, bottom: 100, left: 100, right: 100 }}
        series={[
          {
            data: dataFinance || [],
            arcLabel: (item) => `${item.label} | ${item.value}`,
            innerRadius: 70,
            outerRadius: 100,
            startAngle: 0,
            endAngle: -360,
            highlightScope: {
              highlighted: "item",
              faded: "global",
            } as HighlightScope,
            valueFormatter: (item) => {
              return `R$ ${item.value.toLocaleString("pt-br", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`;
            },
          },
        ]}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "bottom", horizontal: "left" },
            padding: 0,
            labelStyle: {
              fontSize: 14,
              fontWeight: "bold",
              fill: theme.colors.p1,
            },
          },
        }}
      >
        <PieCenterLabel>
          {dataFinance &&
            (dataFinance[1].value /
              (dataFinance[1].value + dataFinance[0].value)) *
              100}
          %
        </PieCenterLabel>
      </PieChartStyled>
    </WrapperPaper>
  );
}
