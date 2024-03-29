import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";
import { Wrapper, WrapperTextField, WrapperError } from "./styles";
import { TextFieldStyles } from "@/theme/defaultStyles";

type InputDefaultProps = {
  label: string;
  placeholder: string;
  messageError?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  register: UseFormRegister<any>;
  registerName: string;
  type: string;
  maxLength?: number;
  disabled?: boolean;
};

export default function InputDefault({
  label,
  placeholder,
  messageError,
  register,
  registerName,
  type,
  maxLength,
  disabled,
}: InputDefaultProps) {
  return (
    <Wrapper>
      <WrapperTextField
        id="standard-basic"
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
      />
      <WrapperError>{messageError}</WrapperError>
    </Wrapper>
  );
}
