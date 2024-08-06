import { UseFormRegister } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Wrapper, WrapperError } from "./styles";
import { theme } from "@/theme";

type SelectDefaultProps = {
  state: string;
  messageError?: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
  registerName: string;
  disabled?: boolean;
  options: {
    value: string;
    label: string;
  }[];
};

export default function SelectDefault({
  state,
  messageError,
  label,
  placeholder,
  register,
  registerName,
  disabled,
  options,
}: SelectDefaultProps) {
  return (
    <Wrapper>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-standard-label" color="secondary">
          {label}
        </InputLabel>
        <Select
          labelId="standard-basic"
          id="standard-basic"
          value={state}
          label={label}
          color="secondary"
          onChange={(event: SelectChangeEvent) =>
            register(registerName).onChange(event)
          }
          disabled={disabled}
          sx={{
            width: "10rem",
            height: "3.2rem",
            fontSize: theme.typography.fontSizes.label,
            color: theme.colors.p1_30,
            backgroundColor: "transparent",
          }}
          inputProps={{ "aria-label": placeholder }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <WrapperError>{messageError}</WrapperError>
    </Wrapper>
  );
}
