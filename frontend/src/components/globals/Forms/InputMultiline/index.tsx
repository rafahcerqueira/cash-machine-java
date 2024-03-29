import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";
import { Wrapper, WrapperTextField, WrapperError } from "./styles";
import { TextFieldStyles } from "@/theme/defaultStyles";

type InputMultilineProps = {
  label: string;
  placeholder: string;
  messageError?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  register: UseFormRegister<any>;
  registerName: string;
  type: string;
  maxLength?: number;
  disabled?: boolean;
};

export default function InputMultiline({
  label,
  placeholder,
  messageError,
  register,
  registerName,
  type,
  maxLength,
  disabled,
}: InputMultilineProps) {
  return (
    <Wrapper>
      <WrapperTextField
        id="filled-multiline-static"
        label={label}
        placeholder={placeholder}
        variant="standard"
        color="secondary"
        type={type}
        inputProps={{ maxLength: maxLength || 50 }}
        {...register(registerName)}
        disabled={disabled}
        InputLabelProps={type === "date" ? { shrink: true } : {}}
        sx={TextFieldStyles}
        multiline
      />
      <WrapperError>{messageError}</WrapperError>
    </Wrapper>
  );
}
