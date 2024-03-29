import { useSnackbar } from "notistack";

type PropsUseNotification = {
  msg: string;
  severity: "error" | "warning" | "info" | "success";
  time?: number;
};

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  return ({ msg, severity, time }: PropsUseNotification) => {
    enqueueSnackbar(msg, {
      variant: severity,
      autoHideDuration: time || 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };
};
