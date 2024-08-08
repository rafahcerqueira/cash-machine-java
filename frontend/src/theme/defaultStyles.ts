import { theme } from ".";

export const DatagridStyles = {
  "& .theme-header": {
    margin: "0",
    backgroundColor: theme.colors.bg1,
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
    color: theme.colors.white,
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
      color: theme.colors.p1_30,
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

export const ModalStyles = {
  container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: theme.colors.backgroundPrimary,
    border: `2px solid ${theme.colors.p1_50}`,
    boxShadow: theme.boxShadow.card,
    p: 4,
    borderRadius: "0.5rem",
  },

  header: {
    margin: "0",
    color: theme.colors.white,
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "1rem",
    borderBottom: `1px solid ${theme.colors.p1_50}`,
  },

  body: {
    padding: "1rem",
    color: theme.colors.p1_75,
    fontSize: "1rem",
  },

  footer: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
  },

  button: {
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    boxShadow: theme.boxShadow.button,
    fontSize: "1rem",
  },

  buttonCancel: {
    backgroundColor: theme.colors.p4,
    color: theme.colors.white,
    "&:hover": {
      backgroundColor: theme.colors.p4,
    },
  },

  buttonConfirm: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    "&:hover": {
      backgroundColor: theme.colors.primary,
    },
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
      color: theme.colors.p1_30,
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
