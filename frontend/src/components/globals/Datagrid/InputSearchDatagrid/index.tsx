import {
  InputSearchWrapper,
  InputSearchIcon,
  InputSearchButton,
  InputSearchInput,
} from "./styles";

type InputSearchDatagridProps = {
  placeholder: string;
  state?: string;
  setState: (value: string) => void;
  handleSubmit: () => void;
};

export default function InputSearchDatagrid({
  placeholder,
  state,
  setState,
  handleSubmit,
}: InputSearchDatagridProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return (
    <InputSearchWrapper>
      <InputSearchButton onClick={handleSubmit}>
        <InputSearchIcon className="material-symbols-outlined">
          search
        </InputSearchIcon>
      </InputSearchButton>
      <InputSearchInput
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
    </InputSearchWrapper>
  );
}
