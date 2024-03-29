import { ReactNode } from "react";
import Button from "@mui/material/Button";
import { ButtonStyles } from "@/theme/defaultStyles";

type ButtonProps = {
  variant: "outlined" | "contained";
  color: "primary" | "secondary" | "success" | "error";
  type: "button" | "submit";
  text: string;
  icon?: ReactNode;
  styles?: React.CSSProperties;
  onClick?: () => void;
};

export default function ButtonDefault({
  variant,
  color,
  type,
  text,
  icon,
  styles,
  onClick,
}: ButtonProps) {
  return (
    <Button
      variant={variant}
      color={color}
      type={type}
      onClick={onClick}
      sx={styles || ButtonStyles}
      startIcon={icon}
    >
      {text}
    </Button>
  );
}
