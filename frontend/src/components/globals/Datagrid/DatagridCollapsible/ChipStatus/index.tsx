import { Chip } from "@mui/material";
import { theme } from "@/theme";

type ChipStatusProps = {
  status: string;
};

type ChipColorsProps = {
  [key: string]: string;
};

const ChipColors: ChipColorsProps = {
  CONCLUÍDO: theme.colors.statusColors.success,
  "EM ANDAMENTO": theme.colors.statusColors.warning,
  RECEBIDO: theme.colors.statusColors.error,
  APROVAÇÃO: theme.colors.statusColors.error,
  "FINALIZAR OS": theme.colors.statusColors.info,
};

export default function ChipStatus({ status }: ChipStatusProps) {
  return (
    <Chip
      label={status}
      sx={{
        border: "1px solid" + ChipColors[status],
        color: ChipColors[status],
        background: "transparent",
        fontSize: theme.typography.fontSizes.button_datagrid,
        fontWeight: theme.typography.fontWeights.bold,
        borderRadius: "0.5rem",
        width: "8.6rem",
      }}
    />
  );
}
