import { theme } from ".";

export const DatagridStyles = {
  "& .theme-header": {
    margin: "0",
    backgroundColor: theme.colors.bg3,
    color: theme.colors.p1,
    fontSize: theme.typography.fontSizes.header_datagrid,
    fontWeight: theme.typography.fontWeights.medium,
  },

  "& .MuiDataGrid-columnHeader:focus-within": {
    outline: "none",
  },

  "& .MuiDataGrid-window": {
    minHeight: "30rem",
  },

  "& .MuiDataGrid-virtualScroller": {
    minHeight: "20rem",
  },

  "& .MuiDataGrid-cell": {
    color: theme.colors.p1,
    fontSize: theme.typography.fontSizes.cell_datagrid,
    fontWeight: theme.typography.fontWeights.medium,
  },

  "& .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },

  "& .MuiDataGrid-toolbarContainer": {
    color: "red",
    margin: ".6rem 0",

    "& .MuiButtonBase-root": {
      color: theme.colors.p1,
      borderRadius: "10rem",
    },
  },

  "& .MuiDataGrid-footerContainer": {
    borderTop: "none",
  },
};

export const DatagridLightStyles = {
  borderStyle: "none",

  "& .theme-header": {
    margin: "0",
    color: theme.colors.p1,
    fontSize: theme.typography.fontSizes.header_datagrid,
    fontWeight: theme.typography.fontWeights.medium,
    borderBottom: "3px solid" + theme.colors.p1_50,
  },

  "& .MuiDataGrid-columnHeader:focus-within": {
    outline: "none",
  },

  "& .MuiDataGrid-window": {
    minHeight: "30rem",
  },

  "& .MuiDataGrid-virtualScroller": {
    minHeight: "20rem",
  },

  "& .MuiDataGrid-cell": {
    color: theme.colors.p1,
    fontSize: theme.typography.fontSizes.cell_datagrid,
    fontWeight: theme.typography.fontWeights.medium,
  },

  "& .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },

  "& .MuiDataGrid-toolbarContainer": {
    color: "red",
    margin: ".6rem 0",

    "& .MuiButtonBase-root": {
      color: theme.colors.p1,
      borderRadius: "10rem",
    },
  },

  "& .MuiDataGrid-footerContainer": {
    borderTop: "none",
  },
};

export const TextFieldStyles = {
  "& .MuiTextField": {
    color: "red !important",
    fontSize: "10rem !important",
  },

  "& .Mui-disabled": {
    color: theme.colors.p1_30,
    fontSize: theme.typography.fontSizes.label,
    fontWeight: theme.typography.fontWeights.regular,

    "& .MuiInputBase-input": {
      fontSize: theme.typography.fontSizes.input,
      color: theme.colors.p1_50,
      fontWeight: theme.typography.fontWeights.medium,
    },
  },
  "& .MuiInput-underline:before": {
    borderBottom: `2px solid ${theme.colors.p1_30} !important`,
  },
};

export const ButtonStyles = {
  width: "10rem",
  height: "2.5rem",
  fontSize: theme.typography.fontSizes.button,
  fontWeight: theme.typography.fontWeights.bold,
};

export const ButtonAddStyles = {
  width: "16rem",
  height: "3.5rem",
  fontSize: theme.typography.fontSizes.button_add,
  fontWeight: theme.typography.fontWeights.bold,
  marginTop: "2rem",
};

export const ButtonTableStyles = {
  width: "7rem",
  height: "2rem",
  fontSize: theme.typography.fontSizes.button_datagrid,
  fontWeight: theme.typography.fontWeights.medium,
};

export const ButtonAccordionStyles = {
  ...ButtonTableStyles,
  width: "8.5rem",
  borderRadius: "0.5rem",
  color: theme.colors.p4,
  backgroundColor: theme.colors.white,

  "&:hover": {
    color: theme.colors.p4,
    backgroundColor: theme.colors.white,
  },
};

export const ButtonUploadStyles = {
  minWidth: "14rem",
  height: "3rem",
  fontSize: theme.typography.fontSizes.button_add,
  fontWeight: theme.typography.fontWeights.medium,
};
