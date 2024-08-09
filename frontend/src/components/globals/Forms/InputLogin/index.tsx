import { UseFormRegister } from "react-hook-form";
import { Wrapper, WrapperTextField, WrapperError } from "./styles";

type InputLoginProps = {
  label: string;
  placeholder: string;
  messageError?: string;
  register: UseFormRegister<any>;
  registerName: string;
  type: string;
  maxLength?: number;
  disabled?: boolean;
  onMaskChange?: (value: string) => void;
};

export default function InputLogin({
  label,
  placeholder,
  messageError,
  register,
  registerName,
  type,
  maxLength,
  disabled,
  onMaskChange,
}: InputLoginProps) {
  return (
    <Wrapper>
      <WrapperTextField
        id="standard-basic"
        label={label}
        placeholder={placeholder}
        variant="standard"
        color="info"
        type={type}
        inputProps={{ maxLength: maxLength || 50 }}
        {...register(registerName)}
        disabled={disabled}
        onChange={(event) => {
          if (onMaskChange) {
            onMaskChange(event.target.value);
          }
        }}
      />
      <WrapperError>{messageError}</WrapperError>
    </Wrapper>
  );
}
