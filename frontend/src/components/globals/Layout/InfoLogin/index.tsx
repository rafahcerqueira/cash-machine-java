import { ContainerInfo, LogoImage, WrapperDev } from "./styles";
import LogoCashMachine from "@/assets/images/cash-machine.svg";

export default function InfoLogin() {
  return (
    <ContainerInfo>
      <LogoImage>
        <img src={LogoCashMachine} alt="Logo - Cash Machine" />
        <div>Caixa Eletrônico Online</div>
      </LogoImage>
      <WrapperDev>
        <span>Desenvolvido por:</span>
        <span>Daniel Toledo</span>
        {/* <img src={LogoCashMachine} alt="Logo - Daniel Toledo" /> */}
      </WrapperDev>
    </ContainerInfo>
  );
}
