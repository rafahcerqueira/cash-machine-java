import ButtonDefault from "@/components/globals/Forms/ButtonDefault";
import { Operations as OperationsEnum } from "@/enums/Operations";
import { Wrapper, Container } from "./styles";
import { theme } from "@/theme";

import HeaderTitle from "@/components/globals/Layout/HeaderTitle";

export default function Operations() {
  const handleOpenModal = (operation: OperationsEnum) => {
    console.log(operation);
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
          styles={{
            width: "24rem",
            height: "4rem",
            color: theme.colors.white,
            fontSize: theme.typography.fontSizes.button_add,
          }}
        />

        <ButtonDefault
          variant="contained"
          color="secondary"
          type="button"
          text={OperationsEnum.SACAR}
          onClick={() => handleOpenModal(OperationsEnum.SACAR)}
          styles={{
            width: "24rem",
            height: "4rem",
            color: theme.colors.white,
            fontSize: theme.typography.fontSizes.button_add,
          }}
        />

        <ButtonDefault
          variant="contained"
          color="secondary"
          type="button"
          text={OperationsEnum.TRANSFERIR}
          onClick={() => handleOpenModal(OperationsEnum.TRANSFERIR)}
          styles={{
            width: "24rem",
            height: "4rem",
            color: theme.colors.white,
            fontSize: theme.typography.fontSizes.button_add,
          }}
        />

        <ButtonDefault
          variant="contained"
          color="secondary"
          type="button"
          text={OperationsEnum.EXTRATO}
          onClick={() => handleOpenModal(OperationsEnum.EXTRATO)}
          styles={{
            width: "24rem",
            height: "4rem",
            color: theme.colors.white,
            fontSize: theme.typography.fontSizes.button_add,
          }}
        />
      </Container>
    </Wrapper>
  );
}
