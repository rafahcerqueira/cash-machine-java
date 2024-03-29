import { ReactNode } from "react";
import Button from "@mui/material/Button";
import { ButtonStyles } from "@/theme/defaultStyles";
import { VisuallyHiddenInput } from "./styles";

type ButtonProps = {
  variant: "outlined" | "contained";
  color: "primary" | "secondary";
  text: string;
  icon?: ReactNode;
  styles?: React.CSSProperties;
};

export default function ButtonUpload({
  variant,
  color,
  text,
  icon,
  styles,
}: ButtonProps) {
  return (
    <Button
      component="label"
      color={color}
      variant={variant}
      sx={styles || ButtonStyles}
      startIcon={icon}
    >
      {text}
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}
