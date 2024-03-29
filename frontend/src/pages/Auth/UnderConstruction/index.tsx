import {
  WrapperLogin,
  ContainerLogin,
  ContainerForm,
  WrapperTitle,
  FixedStripe,
  WrapperForm,
} from "../styles";
import InfoLogin from "@/components/globals/Layout/InfoLogin";
import LogoCashMachine from "@/assets/images/cash-machine.svg";
import ButtonDefault from "@/components/globals/Forms/ButtonDefault";

export default function UnderConstruction() {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <WrapperLogin>
      <FixedStripe />
      <ContainerLogin>
        <InfoLogin />
        <ContainerForm>
          <WrapperTitle>
            <div>
              Seja bem-vindo ao
              <img src={LogoCashMachine} alt="Logo - Cash Machine" />
            </div>
            <h3>
              Estamos trabalhando para entregar uma melhor experiência para
              nossos clientes.
              <br />
              Enquanto isso, fique a vontade para entrar em contato conosco
              pelas nossas redes sociais.
            </h3>
          </WrapperTitle>
          <WrapperForm>
            <ButtonDefault
              variant="contained"
              color="secondary"
              type="submit"
              text="Instagram"
              styles={{
                width: "50%",
                height: "3rem",
                fontSize: "1rem",
              }}
              onClick={() => openInNewTab("https://google.com")}
            />

            <ButtonDefault
              variant="contained"
              color="secondary"
              type="submit"
              text="Email"
              styles={{ width: "50%", height: "3rem", fontSize: "1rem" }}
              onClick={() => openInNewTab("https://google.com")}
            />
          </WrapperForm>
        </ContainerForm>
      </ContainerLogin>
    </WrapperLogin>
  );
}
