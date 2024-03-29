import { HeaderWrapper, HeaderTitle, HeaderLink, HeaderIcon } from "./styles";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathParts = pathname.split("/").filter(Boolean);
  const showHeaderLink = pathParts.length > 1;

  return (
    <HeaderWrapper>
      {showHeaderLink && (
        <HeaderLink onClick={() => navigate(-1)}>
          <HeaderIcon className="material-symbols-outlined">
            chevron_left
          </HeaderIcon>
          <HeaderTitle>Voltar</HeaderTitle>
        </HeaderLink>
      )}
    </HeaderWrapper>
  );
}
