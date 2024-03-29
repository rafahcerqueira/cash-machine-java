import { NavLinks, Icon } from "./styles";

type SidebarButtonProps = {
  path: string;
  icon: string;
  title: string;
};

export default function SidebarButton({
  path,
  icon,
  title,
}: SidebarButtonProps) {
  return (
    <li>
      <NavLinks to={{ pathname: path }}>
        <Icon>
          <span className="material-symbols-outlined">{icon}</span>
        </Icon>
        <span>{title}</span>
      </NavLinks>
    </li>
  );
}
