import {
  SidebarWrapper,
  SidebarBody,
  UnorderList,
  LogoutButton,
} from "./styles";
import SidebarButton from "./SidebarButton";

import { useAuth } from "@/hooks";
import LogoButton from "./LogoButton";
import { useNavigate } from "react-router-dom";

const SidebarData = [
  {
    title: "Início",
    path: "/",
    icon: "home",
  },
  {
    title: "Operações",
    path: "/operacoes",
    icon: "apps",
  },
  {
    title: "Extrato",
    path: "/extrato",
    icon: "account_balance_wallet",
  },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <SidebarWrapper>
      <SidebarBody>
        <LogoButton />
        <UnorderList>
          {SidebarData.map((item, index) => {
            return (
              <SidebarButton
                key={index}
                path={item.path}
                icon={item.icon}
                title={item.title}
              />
            );
          })}
        </UnorderList>
      </SidebarBody>
      <LogoutButton onClick={handleLogout}>
        <span className="material-symbols-outlined">logout</span> Sair
      </LogoutButton>
    </SidebarWrapper>
  );
}
