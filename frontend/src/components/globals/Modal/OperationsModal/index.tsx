import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ModalStyles } from "@/theme/defaultStyles";
import NotesManager from "@/components/Utils/NotesManager";
import { Operations } from "@/enums/Operations";
import axios from "@/api/axios";
import { useAuth } from "@/hooks";

type OperationsModalProps = {
  open: boolean;
  operation: string;
  onClose: () => void;
};

const ListNotes = [2, 5, 10, 20, 50, 100, 200];

export default function OperationsModal({
  open,
  operation,
  onClose,
}: OperationsModalProps) {
  const [notesValue, setNotesValue] = useState<Record<number, number>>({});
  const { user } = useAuth();

  const getTotalValue = () => {
    return ListNotes.reduce((total, note) => {
      return total + (notesValue[note] || 0) * note;
    }, 0);
  };

  const handleSubmit = async () => {
    switch (operation) {
      case Operations.DEPOSITAR:
        // Adicione a lógica de depósito aqui
        break;
      case Operations.SACAR:
        const response = await axios.post("/api/transactions/withdraw", {
          userId: user?.id,
          amount: getTotalValue(),
          notes: notesValue,
        });

        if (response.status === 200) {
          console.log("Saque realizado com sucesso!");
        } else {
          console.error("Erro ao realizar saque!");
        }

        break;
      case Operations.TRANSFERIR:
        // Adicione a lógica de transferência aqui
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      }}
    >
      <Box sx={ModalStyles.container}>
        <Typography id="modal-title" sx={ModalStyles.header}>
          {operation}
        </Typography>
        <Box sx={ModalStyles.body}>
          {operation === "Sacar" && (
            <NotesManager
              value={notesValue}
              setValue={setNotesValue}
              listNotes={ListNotes}
            />
          )}

          {/* Adicione outros conteúdos baseados na operação aqui */}
        </Box>
        <Box sx={ModalStyles.footer}>
          <Button
            sx={{ ...ModalStyles.button, ...ModalStyles.buttonCancel }}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            sx={{ ...ModalStyles.button, ...ModalStyles.buttonConfirm }}
            onClick={() => {
              // Adicione a lógica de confirmação aqui
              onClose();
            }}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
