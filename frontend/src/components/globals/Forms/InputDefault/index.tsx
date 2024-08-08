import { UseFormRegister } from "react-hook-form";
import { Wrapper, WrapperTextField, WrapperError } from "./styles";

type InputDefaultProps = {
  label: string;
  placeholder: string;
  messageError?: string;
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
      />
      <WrapperError>{messageError}</WrapperError>
    </Wrapper>
  );
}
