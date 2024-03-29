import { Link } from "react-router-dom";
import { LogoImage, LogoWrapper } from "./styles";
import LogoCashMachine from "@/assets/images/cash-machine.svg";

export default function LogoButton() {
  return (
    <LogoWrapper>
      <Link to="/">
        <LogoImage src={LogoCashMachine} alt="Logo" />
      </Link>
    </LogoWrapper>
  );
}
