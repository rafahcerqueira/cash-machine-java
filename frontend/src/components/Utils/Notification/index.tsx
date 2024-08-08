import { useSnackbar } from "notistack";

export interface PropsUseWarningSnackbar {
  msg: string;
  severity: "error" | "warning" | "info" | "success";
  time?: number;
}

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  return ({ msg, severity, time }: PropsUseWarningSnackbar) => {
    enqueueSnackbar(msg, {
      variant: severity,
      autoHideDuration: time || 5000,
    });
  };
};
