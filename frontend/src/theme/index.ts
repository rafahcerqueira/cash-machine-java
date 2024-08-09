import { createTheme } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import { colors, boxShadow } from "./colors";
import { margins, paddings, gaps } from "./spacing";
import {
  fontFamily,
  fontSizes,
  fontStyle,
  fontWeights,
  lineHeights,
} from "./typography";
import { widths } from "./sizing";

export const theme = {
  colors,
  boxShadow,
  typography: {
    fontFamily,
    fontSizes,
    fontStyle,
    fontWeights,
    lineHeights,
  },
  spacing: {
    margins,
    paddings,
    gaps,
  },
  sizing: {
    widths,
  },
};

export const themeMUI = createTheme(
  {
    palette: {
      primary: {
        main: theme.colors.p2,
      },
      secondary: {
        main: theme.colors.p1,
      },
      success: {
        main: theme.colors.statusColors.success,
      },
      error: {
        main: theme.colors.statusColors.error,
      },
    },
    typography: {
      fontFamily: theme.typography.fontFamily.primary,
    },
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            color: theme.colors.white,
            fontSize: theme.typography.fontSizes.input,
            fontWeight: theme.typography.fontWeights.medium,
          },
        },
      },
    },
  },
  ptBR
);
