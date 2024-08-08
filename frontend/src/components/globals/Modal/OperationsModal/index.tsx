import { useEffect, useState } from "react";
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
import { Checkbox, FormControlLabel } from "@mui/material";
import { TransferSchema } from "@/utils/transferSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputLogin from "../../Forms/InputLogin";
import InputDefault from "../../Forms/InputDefault";

type OperationsModalProps = {
  open: boolean;
  operation: string;
  onClose: () => void;
};

type Inputs = z.infer<typeof TransferSchema>;

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

  const {
    register,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(TransferSchema),
  });

  const getTotalValue = () => {
    return ListNotes.reduce((total, note) => {
      return total + (notesValue[note] || 0) * note;
    }, 0);
  };

  const onChangeAccountNumber = (value: string) => {
    const clearAccountNumber = value.replace(/\D+/g, "");
    const maskedAccountNumber = clearAccountNumber.replace(
      /(\d{7})(\d{0,7})/,
      "$1-$2"
    );
    setValue("accountNumberRecipient", maskedAccountNumber);
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

  const handleTransfer = async () => {
    try {
      const response = await axios.post("/api/transactions/transfer", {
        accountNumberOrigin: user?.account.accountNumber,
        accountNumberRecipient: getValues("accountNumberRecipient"),
        amount: Number(getValues("amount")),
      });

      if (response.status === 200) {
        showWarningSnackbar({
          msg: "Transferência realizada com sucesso!",
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
        if (getTotalValue() > 0) handleDeposit();
        else showWarningSnackbar({ msg: "Valor inválido.", severity: "error" });
        break;
      case Operations.SACAR:
        if (getTotalValue() > 0) handleWithdraw();
        else showWarningSnackbar({ msg: "Valor inválido.", severity: "error" });
        break;
      case Operations.TRANSFERIR:
        if (getValues("amount") > 0) handleTransfer();
        else showWarningSnackbar({ msg: "Valor inválido.", severity: "error" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    reset();
    setNotesValue({});
    setIsDollar(false);
  }, [open]);

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
          {operation === Operations.SACAR && (
            <NotesManager
              value={notesValue}
              setValue={setNotesValue}
              listNotes={ListNotes}
            />
          )}
          {operation === Operations.DEPOSITAR && (
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={isDollar}
                    onChange={() => setIsDollar(!isDollar)}
                  />
                }
                label="Dólar"
                sx={{ color: "white" }}
              />
              <NotesManager
                value={notesValue}
                setValue={setNotesValue}
                listNotes={ListNotes}
              />
            </Box>
          )}
          {operation === Operations.TRANSFERIR && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.4rem",
              }}
            >
              <InputLogin
                label="Conta de destino"
                placeholder="Digite a conta de destino"
                messageError={errors.accountNumberRecipient?.message}
                register={register}
                registerName="accountNumberRecipient"
                type="text"
                maxLength={9}
                onMaskChange={onChangeAccountNumber}
              />
              <InputDefault
                label="Valor"
                placeholder="Digite o valor"
                messageError={errors.amount?.message}
                register={register}
                registerName="amount"
                type="number"
              />
            </Box>
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
