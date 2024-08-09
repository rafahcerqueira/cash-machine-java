import { useState } from "react";
import { Wrapper, WrapperError } from "./styles";

import { UseFormRegister } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

type InputPasswordProps = {
  label: string;
  placeholder: string;
  messageError?: string;
  register: UseFormRegister<any>;
  registerName: "password" | "confirmPassword";
  maxLength?: number;
  disabled?: boolean;
};

export default function InputPassword({
  label,
  placeholder,
  messageError,
  register,
  registerName,
  maxLength,
  disabled,
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Wrapper>
      <FormControl variant="standard">
        <InputLabel htmlFor="standard-adornment-password" color="secondary">
          {label}
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          color="info"
          placeholder={placeholder}
          {...register(registerName)}
          inputProps={{ maxLength: maxLength || 50 }}
          disabled={disabled}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? (
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                ) : (
                  <span className="material-symbols-outlined">visibility</span>
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <WrapperError>{messageError}</WrapperError>
      </FormControl>
    </Wrapper>
  );
}
