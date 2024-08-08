import ButtonDefault from "@/components/globals/Forms/ButtonDefault";
import { Operations as OperationsEnum } from "@/enums/Operations";
import { Wrapper, Container } from "./styles";
import { theme } from "@/theme";

import HeaderTitle from "@/components/globals/Layout/HeaderTitle";
import { useNavigate } from "react-router-dom";
import OperationsModal from "@/components/globals/Modal/OperationsModal";
import { useState } from "react";

const buttonStyles = {
  width: "24rem",
  height: "4rem",
  color: theme.colors.white,
  fontSize: theme.typography.fontSizes.button_add,
};

export default function Operations() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const navigate = useNavigate();

  const handleOpenModal = (operation: OperationsEnum) => {
    setCurrentOperation(operation);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Wrapper>
      <HeaderTitle>OPERAÇÕES</HeaderTitle>
      <Container>
        <ButtonDefault
          variant="contained"
          color="secondary"
          type="button"
          text={OperationsEnum.DEPOSITAR}
          onClick={() => handleOpenModal(OperationsEnum.DEPOSITAR)}
          styles={buttonStyles}
        />

        <ButtonDefault
          variant="contained"
          color="secondary"
          type="button"
          text={OperationsEnum.SACAR}
          onClick={() => handleOpenModal(OperationsEnum.SACAR)}
          styles={buttonStyles}
        />

        <ButtonDefault
          variant="contained"
          color="secondary"
          type="button"
          text={OperationsEnum.TRANSFERIR}
          onClick={() => handleOpenModal(OperationsEnum.TRANSFERIR)}
          styles={buttonStyles}
        />

        <ButtonDefault
          variant="contained"
          color="secondary"
          type="button"
          text={OperationsEnum.EXTRATO}
          onClick={() => navigate("/extrato")}
          styles={buttonStyles}
        />

        <OperationsModal
          open={modalOpen}
          operation={currentOperation}
          onClose={handleCloseModal}
        />
      </Container>
    </Wrapper>
  );
}
