import { useEffect, useState } from "react";
import { WrapperPaper, HeaderStyled } from "./styles";
import SimpleTitle from "@/components/globals/Layout/SimpleTitle";
import { BarChart } from "@mui/x-charts/BarChart";
import { AxisConfig, axisClasses } from "@mui/x-charts";
import { theme } from "@/theme";
import { DataTripProps } from "..";
import SelectDefault from "@/components/globals/Forms/SelectDefault";

type BarsChartProps = {
  dataTrip?: DataTripProps;
};

const chartSetting = {
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const OptionSelect = [
  {
    value: 6,
    label: "Último 6 meses",
  },
  {
    value: 12,
    label: "Último 12 meses",
  },
];

export default function BarsChart({ dataTrip }: BarsChartProps) {
  const [SelectValue, setSelectValue] = useState<number>(6);
  const [dataTripFiltered, setDataTripFiltered] = useState<DataTripProps>();

  useEffect(() => {
    if (dataTrip && SelectValue) {
      const dataTripFiltered = dataTrip.filter((item, index) => {
        if (index < SelectValue) {
          return item;
        }
      });
      setDataTripFiltered(dataTripFiltered);
    } else if (!SelectValue) {
      setDataTripFiltered(dataTrip);
    }
  }, [dataTrip, SelectValue]);

  return (
    <WrapperPaper>
      <HeaderStyled>
        <SimpleTitle>VIAGENS</SimpleTitle>
        <SelectDefault
          state={SelectValue}
          setState={setSelectValue}
          label="Período"
          options={OptionSelect}
        />
      </HeaderStyled>
      <BarChart
        dataset={dataTripFiltered || dataTrip}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
            categoryGapRatio: 0.7,
            barGapRatio: 0.2,
          } as AxisConfig<"band">,
        ]}
        series={[
          { dataKey: "online", label: "Viagens Online" },
          { dataKey: "offline", label: "Viagens Offline" },
        ]}
        colors={[theme.colors.g1, theme.colors.g2]}
        {...chartSetting}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "top", horizontal: "right" },
            padding: 0,
            labelStyle: {
              fontSize: 14,
              fontWeight: "bold",
              fill: theme.colors.p1,
            },
            itemMarkHeight: 4,
            itemMarkWidth: 18,
          },
        }}
      />
    </WrapperPaper>
  );
}
