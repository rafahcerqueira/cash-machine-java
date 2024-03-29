import {
  InputSearchSimpleWrapper,
  InputSearchSimpleIcon,
  InputSearchSimpleButton,
  InputSearchSimpleInput,
} from "./styles";

type InputSearchSimpleProps = {
  placeholder: string;
  state?: string;
  setState: (value: string) => void;
  handleSubmit: () => void;
};

export default function InputSearchSimple({
  placeholder,
  state,
  setState,
  handleSubmit,
}: InputSearchSimpleProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return (
    <InputSearchSimpleWrapper>
      <InputSearchSimpleButton onClick={handleSubmit}>
        <InputSearchSimpleIcon className="material-symbols-outlined">
          search
        </InputSearchSimpleIcon>
      </InputSearchSimpleButton>
      <InputSearchSimpleInput
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
    </InputSearchSimpleWrapper>
  );
}
