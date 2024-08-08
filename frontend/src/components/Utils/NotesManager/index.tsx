import React, { useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";

interface NotesManagerProps {
  value: Record<number, number>;
  setValue: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  listNotes?: number[];
}

export default function NotesManager({
  value,
  setValue,
  listNotes,
}: NotesManagerProps) {
  const handleIncrement = (note: number) => {
    setValue((prevValue) => ({
      ...prevValue,
      [note]: (prevValue[note] || 0) + 1,
    }));
  };

  const handleClear = () => {
    setValue({});
  };

  useEffect(() => {
    handleClear();
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        {listNotes?.map((note) => (
          <Box
            key={note}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleIncrement(note)}
              sx={{ width: "5rem" }}
            >
              R$
              {note.toLocaleString("pt-br", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Button>
            <TextField
              variant="outlined"
              color="secondary"
              value={value[note] || 0}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "5rem" }}
            />
          </Box>
        ))}
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClear}
        sx={{ mt: 2 }}
      >
        Limpar
      </Button>
    </Box>
  );
}
