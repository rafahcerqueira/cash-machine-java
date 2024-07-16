import { Wrapper, Container } from "./styles";

import HeaderTitle from "@/components/globals/Layout/HeaderTitle";
import Cards from "./Cards";

export default function Dashboard() {
  return (
    <Wrapper>
      <HeaderTitle>TELA INICIAL</HeaderTitle>
      <Container>
        <Cards />
      </Container>
    </Wrapper>
  );
}
