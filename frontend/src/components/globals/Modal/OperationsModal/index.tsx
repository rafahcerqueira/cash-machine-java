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
import { useNotification } from "@/hooks/Notification/useNotification";

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
  const [isDollar, setIsDollar] = useState(false);
  const { user } = useAuth();
  const showWarningSnackbar = useNotification();

  const getTotalValue = () => {
    return ListNotes.reduce((total, note) => {
      return total + (notesValue[note] || 0) * note;
    }, 0);
  };

  const handleWithdraw = async () => {
    try {
      const response = await axios.post("/api/transactions/withdraw", {
        userId: user?.id,
        amount: getTotalValue(),
        notes: notesValue,
      });

      if (response.status === 200) {
        showWarningSnackbar({
          msg: "Saque realizado com sucesso! Imprimindo notas...",
          severity: "success",
        });
      } else {
        showWarningSnackbar({
          msg: response.data?.message || "Erro desconhecido.",
          severity: "error",
        });
      }

      onClose();
    } catch (error) {
      const errorMsg =
        error.response?.data || "Erro desconhecido. Tente novamente.";

      showWarningSnackbar({
        msg: errorMsg,
        severity: "error",
      });
    }
  };

  const handleDeposit = async () => {
    try {
      const response = await axios.post("/api/transactions/deposit", {
        userId: user?.id,
        amount: getTotalValue(),
        notes: notesValue,
        isDollar: isDollar,
      });

      if (response.status === 200) {
        showWarningSnackbar({
          msg: "Depósito realizado com sucesso!",
          severity: "success",
        });
      } else {
        showWarningSnackbar({
          msg: response.data?.message || "Erro desconhecido.",
          severity: "error",
        });
      }

      onClose();
    } catch (error) {
      const errorMsg =
        error.response?.data || "Erro desconhecido. Tente novamente.";

      showWarningSnackbar({
        msg: errorMsg,
        severity: "error",
      });
    }
  };

  const handleSubmit = async () => {
    switch (operation) {
      case Operations.DEPOSITAR:
        handleDeposit();
        break;
      case Operations.SACAR:
        handleWithdraw();
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
        <Box sx={ModalStyles.header}>
          <Typography id="modal-title" sx={ModalStyles.title}>
            {operation}
          </Typography>

          {(operation === Operations.SACAR ||
            operation === Operations.DEPOSITAR) && (
            <Typography sx={ModalStyles.subtitle}>
              Total: R${" "}
              {getTotalValue().toLocaleString("pt-br", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          )}
        </Box>
        <Box sx={ModalStyles.body}>
          {(operation === Operations.SACAR ||
            operation === Operations.DEPOSITAR) && (
            <NotesManager
              value={notesValue}
              setValue={setNotesValue}
              listNotes={ListNotes}
            />
          )}
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
            onClick={handleSubmit}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
