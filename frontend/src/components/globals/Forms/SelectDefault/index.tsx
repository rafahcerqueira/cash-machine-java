import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Wrapper } from "./styles";
import { theme } from "@/theme";

type SelectDefaultProps = {
  state: number;
  setState: (value: number) => void;
  label: string;
  options: {
    value: number;
    label: string;
  }[];
};

export default function SelectDefault({
  state,
  setState,
  label,
  options,
}: SelectDefaultProps) {
  return (
    <Wrapper>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color="secondary">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(state)}
          label={label}
          color="secondary"
          onChange={(event: SelectChangeEvent) =>
            setState(Number(event.target.value))
          }
          sx={{
            width: "12rem",
            height: "3rem",
            fontSize: theme.typography.fontSizes.label,
            color: theme.colors.p1_30,
          }}
        >
          <MenuItem value={0}>Nenhum</MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Wrapper>
  );
}
