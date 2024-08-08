import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Wrapper, WrapperError } from "./styles";

type SelectDefaultProps = {
  value: string | number;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  messageError?: string;
  label: string;
  placeholder: string;
  options: {
    value: string | number;
    label: string;
  }[];
};

export default function SelectDefault({
  value,
  onChange,
  messageError,
  label,
  placeholder,
  options,
}: SelectDefaultProps) {
  return (
    <Wrapper>
      <FormControl fullWidth variant="standard">
        <InputLabel id={`${label}-label`} color="secondary">
          {label}
        </InputLabel>
        <Select
          labelId={`${label}-label`}
          value={value}
          onChange={onChange}
          color="secondary"
          displayEmpty
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {messageError && <WrapperError>{messageError}</WrapperError>}
    </Wrapper>
  );
}
